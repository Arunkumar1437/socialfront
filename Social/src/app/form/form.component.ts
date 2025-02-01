import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  
pagedUserRights: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  @Input() totalItems: number = 0;  
  @Input() itemsByPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();  
  numPages: number = 1;
  userid: any;
  user: any;
  formForm: FormGroup;
  formList: any[] = [];
  userList: any[] = [];
  isList: boolean = true;
  isEdit: boolean = false;
  isView: boolean = false;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private commonService: CommonService,
      private _snackBar: MatSnackBar
    ) {
      this.formForm = this.formBuilder.group({
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
  
      this.getList();
    }

    getList(): void {
      this.commonService.formList().subscribe({
        next: (data: any) => {
          this.formList = data.formpagelist || [];
          this.totalItems = this.formList.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    updatePagedData(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.formList;
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
      const sourceData = this.searchTerm ? this.filteredData : this.formList;
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
    filterTable(): void {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.formList.filter(
        item =>
          item.formid.toLowerCase().includes(term) ||
          item.formname.toLowerCase().includes(term)||
          item.icon.toLowerCase().includes(term) ||
          item.displayorder.toString().includes(term) ||  
          item.redirect.toLowerCase().includes(term) ||
          item.link.toLowerCase().includes(term)||
          item.active.toString().toLowerCase().includes(term) 
        );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
              this.formForm.reset();
              this.getList(); 
    }

    viewform(item: any): void {
      this.isList = false;
      this.isEdit = false;
      this.isView = true;
      this.loadvalue(item.userid);
    }
  
    deleteForm(item: any): void {
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
    editForm(item: any): void {
      this.isList = false;
      this.isEdit = true;
      const usernameControl = this.formForm.get('username');
      const usernameControl1 = this.formForm.get('edit');
  
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
          const uname = data.username;
          const userRightsEdit = data.userrightsedit || [];
          this.formForm.patchValue({
            username: uname,
            userid:userid
          });
  
          
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
}

