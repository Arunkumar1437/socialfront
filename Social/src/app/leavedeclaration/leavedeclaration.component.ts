import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-leavedeclaration',
  templateUrl: './leavedeclaration.component.html',
  styleUrl: './leavedeclaration.component.css'
})
export class LeavedeclarationComponent implements OnInit {
  leavedecForm: FormGroup;
  leavedetail: any[] = [];
  leavedeclList: any[] = [];
  pagedUserRights: any[] = [];
  filteredData: any[] = [];

  isList: boolean = true;
  isEdit: boolean = false;
  isView: boolean = false;

  userid: any;
  userRightsview: any[] = [];

  @Input() totalItems: number = 0;
  @Input() itemsByPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  numPages: number = 1;
  searchTerm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.leavedecForm = this.formBuilder.group({
      userid: [''],
      year: [''],
      edit: [false,],
      leavedetaillist: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('UserId');
    if(this.userid!=""){
      this.leavedecForm.get('userid')?.setValue(this.userid);
      console.log('Login user Id:', this.userid);
    }
    this.leavedecForm.get('year')?.valueChanges.subscribe(() => {
      if(!this.isEdit){
        this.getleaveDetails();
      }
    });
    this.getList(this.userid);
  }

  get leavedetaillistArray(): FormArray {
    return this.leavedecForm.get('leavedetaillist') as FormArray;
  }

  getleaveDetails(): void {
    this.commonService.leavedetails().subscribe({
      next: (data: any) => {
        const leavedetailadd = data.leavedetail || [];
        this.leavedetaillistArray.clear();
        leavedetailadd.forEach((item: any) => {
          this.leavedetaillistArray.push(this.formBuilder.group({
            leavetypecode: [item.leavetypecode],
            ltname: [item.ltname],
            minimum: [item.minimum],
            maximum: [item.maximum]
          }));
        });
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }

  onSubmit(): void {
    if (this.leavedecForm.valid) {
      if(this.isEdit){
        this.leavedecForm.get('edit')?.setValue(this.isEdit);
        this.leavedecForm.get('userid')?.setValue(this.userid);
      }
      this.commonService.saveupdateleavedec(this.leavedecForm.value).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = this.isEdit ? 'Updated successfully' : 'Saved successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.resetFormAndList();
          }else{
            if(res.message ===''){
            this._snackBar.open('Unable to save', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }else{
            const message1 = res.message;
            this._snackBar.open(message1, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }
          }
        },
        error: () => {
          this._snackBar.open('An error occurred while saving', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      });
    }
  }

  openAddUserrights(): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = false;
  }

  cancel(): void {
    this.resetFormAndList();
  }

  getList(luser:any): void {
    this.commonService.leavedeclList(luser).subscribe({
      next: (data: any) => {
        this.leavedeclList = data.getleavedeclist || [];
        this.totalItems = this.leavedeclList.length;
        this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
        this.updatePagedData();
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }

  editleavedecl(item: any): void {
    this.isList = false;
    this.isEdit = true;
    this.loadvalue(item.leavedeclid);
  }

  loadvalue(leavedeclid: any): void {
    this.commonService.editleavedecl(leavedeclid).subscribe({
      next: (data: any) => {
        this.leavedetaillistArray.clear();
        
        const year = data.year;
        const leavedetaillist1 = data.leavedetaillist || [];
        
        // Patch the year
        this.leavedecForm.patchValue({
          year: year,
        });
  
        leavedetaillist1.forEach((item: any) => {
          const group = this.formBuilder.group({
            leavedeclid:[item.leavedeclid],
            leavetypecode: [item.leavetypecode],
            ltname: [item.ltname],
            minimum: [item.minimum],
            maximum: [item.maximum]  // Ensure maximum is correctly set
          });
          
          // Check if the maximum value is 1
          if (item.maximum === 1) {
            console.log('Maximum value is 1', item);
          }
  
          this.leavedetaillistArray.push(group);
        });
      },
      error: (e: any) => {
        console.error('Error fetching leave details:', e);
      },
    });
  }
  

  viewleavedecl(item: any): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = true;
    this.loadvalue(item.leavedeclid);
  }

  deleteleavedecl(item: any): void {
    this.commonService.leavedeclDelete(item.leavedeclid).subscribe({
      next: (data: any) => {
        if (data.sucess) {
          this._snackBar.open('Deleted successfully', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.getList(this.userid);
        }
      },
      error: (e: any) => console.error('Error deleting data:', e)
    });
  }

  updatePagedData(): void {
    const sourceData = this.searchTerm ? this.filteredData : this.leavedeclList;
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
    const sourceData = this.searchTerm ? this.filteredData : this.leavedeclList;
    this.totalItems = sourceData.length;
    this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
    if (this.currentPage > this.numPages) {
      this.currentPage = this.numPages;
    }
    this.updatePagedData();
    this.pageChanged.emit(this.currentPage);
  }

  selectPage(page: number): void {
    if (page >= 1 && page <= this.numPages) {
      this.currentPage = page;
      this.updatePagedData();
    }
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
    this.filteredData = this.leavedeclList.filter(
      item =>
        item.userid.toLowerCase().includes(term) ||
        item.username.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  private resetFormAndList(): void {
    this.leavedecForm.reset();
    this.isEdit = false;
    this.isView = false;
    this.isList = true;
    this.getList(this.userid);
  }
}
