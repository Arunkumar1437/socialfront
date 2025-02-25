import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  formList: any[] = [];
  userList: any[] = [];
  formdetaillist: any[] = [];
  isList: boolean = true;
  userrightslist: any[] = [];
  isEdit: boolean = false;
  isView: boolean = false;
  userid: any;
  user: any;
  userRightsview: any[] = [];
  userRightsadd: any[] = [];
  pagedUserRights: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  searchTerm1: string = '';
  @Input() totalItems: number = 0;  
  @Input() itemsByPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();  
  numPages: number = 1;
  isSelectVisible: boolean = false;  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      userid: ['',],
      edit: [false],
      view: [false],
      formdetaillist: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    const luserid = localStorage.getItem('userid');
    const lusername = localStorage.getItem('username');
    this.user = lusername;
    this.userid = luserid;
    const userlistlocal = localStorage.getItem('userlist');

    if (userlistlocal) {
      this.userList = JSON.parse(userlistlocal); 
    } else {
      this.userList = [];  
    }
    this.adminForm.get('username')?.valueChanges.subscribe(usrid => {
      if (usrid && !this.isEdit) {
        this.getFormDetails(usrid);
      }
    });
    this.getList();
  }

  get formdetaillistArray(): FormArray {
    return this.adminForm.get('formdetaillist') as FormArray;
  }

  getFormDetails(usrid: any): void {
    this.commonService.formdetails(usrid).subscribe({
      next: (data: any) => {
        this.formList = data.formlist || [];
        this.formdetaillist = data.formdetaillist || [];
        let userRightsadd = data.userrightsedit || [];

        this.populateFormDetails();

        // Convert userRightsadd to a Map for quick lookup
        const userRightsMap = new Map(userRightsadd.map((item: any) => [item.formid, item]));

        // Remove matching formids from userRightsadd
        userRightsadd = userRightsadd.filter((item: any) => 
          !this.formdetaillist.some((form: any) => form.formid === item.formid)
        );

        this.formdetaillist.forEach((form: any) => {
          if (!userRightsMap.has(form.formid)) {
            userRightsadd.push({
              formid: form.formid,
              formname: form.formname,
              all: false,
              create: false,
              read: false,
              update: false,
              delete: false,
            });
          }
        });
        this.formdetaillistArray.clear();
        userRightsadd.forEach((item: any) => {
          const group = this.formBuilder.group({
            formid: [item.formid],
            formname: [item.formname],
            all: [item.all === true],
            create: [item.create === true],
            read: [item.read === true],
            update: [item.update === true],
            delete: [item.delete === true],
          });
          this.formdetaillistArray.push(group);
        });
      },
      error: (e: any) => {
        console.error('Error fetching data:', e);
      },
    });
}

  populateFormDetails(): void {
    this.formdetaillistArray.clear();
    this.formdetaillist.forEach((item: any) => {
      this.formdetaillistArray.push(
        this.formBuilder.group({
          formid: [item.formid],
          formname: [item.formname],
          all: [false],
          create: [false],
          read: [false],
          update: [false],
          delete: [false],
        })
      );
    });
  }

  toggleAll(index: number): void {
    const group = this.formdetaillistArray.at(index) as FormGroup;
    const isChecked = group.get('all')?.value;

    group.patchValue({
      create: isChecked,
      read: isChecked,
      update: isChecked,
      delete: isChecked,
    });
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const useris= this.adminForm.get('username')?.value;
      console.log(useris);
      this.commonService.saveuserrightData(this.adminForm.value).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.isList = true;
            this.adminForm.reset();
            this.isEdit = false;
            this.getList();
          }
        },
        error: (err: any) => {
          console.error('Error:', err);
          this._snackBar.open('An error occurred while saving', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  openAddUserrights(): void {
    this.isList = false;
  }

  cancel(): void {
    this.isList = true;
    this.isView = false;
  }

  getList(): void {
    this.commonService.userList().subscribe({
      next: (data: any) => {
        this.userrightslist = data.userrightslist || [];
        this.totalItems = this.userrightslist.length;
        this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
        this.updatePagedData(); 
      },
      error: (e: any) => {
        console.error('Error fetching data:', e);
      },
    });
  }

  editUserrights(item: any): void {
    this.isList = false;
    this.isEdit = true;
    const usernameControl = this.adminForm.get('username');
    const usernameControl1 = this.adminForm.get('edit');

    if (usernameControl && usernameControl1) {
      usernameControl.setValue(item.userid);
      usernameControl1.setValue(this.isEdit);
      this.loadvalue(item.userid);
    } else {
      console.error("Form control 'username' does not exist.");
    }
  }

  loadvalue(userid: any): void {
    this.commonService.useredit(userid).subscribe({
      next: (data: any) => {
        this.formdetaillistArray.clear();
        const uname = data.username;
        const userRightsEdit = data.userrightsedit || [];
        this.userRightsview=data.userrightsedit;
        this.adminForm.patchValue({
          username: uname,
          userid:userid
        });

        userRightsEdit.forEach((item: any, index: number) => {
          const group = this.formBuilder.group({
            formid: [item.formid],
            formname: [item.formname],
            all: [item.all === 'true'],
            create: [item.create === 'true'],
            read: [item.read === 'true'],
            update: [item.update === 'true'],
            delete: [item.delete === 'true'],
          });
          this.formdetaillistArray.push(group);
        });
      },
      error: (e: any) => {
        console.error('Error fetching data:', e);
      },
    });
  }

  viewUserrights(item: any): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = true;
    this.loadvalue(item.userid);
  }

  deleteUserrights(item: any): void {
    this.commonService.userDelete(item.userid).subscribe({
      next: (data: any) => {
        if (data.sucess) {
          this._snackBar.open('Deleted successfully', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.getList();
        }
      },
      error: (e: any) => {
        console.error('Error deleting data:', e);
      },
    });
  }
  // <----pagenation start here ---->
  updatePagedData(): void {
    const sourceData = this.searchTerm ? this.filteredData : this.userrightslist;
    const startIndex = (this.currentPage - 1) * this.itemsByPage;
    const endIndex = startIndex + this.itemsByPage;
    this.pagedUserRights = sourceData.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagedData();
    this.pageChanged.emit(newPage);
  }

  updatePagination(): void {
    const sourceData = this.searchTerm ? this.filteredData : this.userrightslist;
    this.totalItems = sourceData.length;
    this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
  
    if (this.currentPage > this.numPages) {
      this.currentPage = this.numPages;
    }
  
    this.updatePagedData();
    this.pageChanged.emit(this.currentPage);
  }

  selectPage(page: number) {
    if (page < 1 || page > this.numPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagedData();
  }

  onPageNumberChange(): void {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.numPages) {
      this.currentPage = this.numPages;
    }
  
    this.updatePagedData();
  }
  //<---- pagenation end  here ---->
  filterTable(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.userrightslist.filter(
      item =>
        item.userid.toLowerCase().includes(term) ||
        item.username.toLowerCase().includes(term)
    );
    this.currentPage = 1; 
    this.updatePagination();
    this.isList = true;
            this.adminForm.reset();
            this.isEdit = false;
            this.getList(); 
    
  }

}
