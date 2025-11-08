import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-leaveentry',
  templateUrl: './leaveentry.component.html',
  styleUrl: './leaveentry.component.css'
})
export class LeaveentryComponent  implements OnInit {
  leaveentryForm: FormGroup;
  leavedetail: any[] = [];
  leaveentryList: any[] = [];
  pageddata: any[] = [];
  filteredData: any[] = [];
  userRightsview: any[] = [];
  userList: any[] = [];
  isList: boolean = true;
  isEdit: boolean = false;
  isView: boolean = false;
  noOfDays: number = 0;
  userid: any;
  username: any;
  description:any;

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
    this.leaveentryForm = this.formBuilder.group({
      empid:['',Validators.required],
      month:['',Validators.required],
      lopyear:['',Validators.required],
      lopdays:['',Validators.required],
       edit:[false]
    });
  }
months = [
  { name: 'JAN', value: '01' },
  { name: 'FEB', value: '02' },
  { name: 'MAR', value: '03' },
  { name: 'APR', value: '04' },
  { name: 'MAY', value: '05' },
  { name: 'JUN', value: '06' },
  { name: 'JUL', value: '07' },
  { name: 'AUG', value: '08' },
  { name: 'SEP', value: '09' },
  { name: 'OCT', value: '10' },
  { name: 'NOV', value: '11' },
  { name: 'DEC', value: '12' }
];

years: number[] = [];

  ngOnInit(): void {
    this.userid = localStorage.getItem('UserId');
    this.username=localStorage.getItem('username');
      const userlistlocal = localStorage.getItem('userlist');

    if (userlistlocal) {
      this.userList = JSON.parse(userlistlocal); 
    } else {
      this.userList = [];  
    }
    if(this.userid!=""){
      this.leaveentryForm.get('userid')?.setValue(this.userid);
      this.leaveentryForm.get('empid')?.setValue(this.userid);
      this.leaveentryForm.get('empname')?.setValue(this.username);
      console.log('Login user Id:', this.userid);
      console.log('Login user Name:', this.username);
    }
     this.getList(this.userid);
    const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    this.years.push(i);
  }
   }

  get creditlistArray(): FormArray {
    return this.leaveentryForm.get('creditlist') as FormArray;
  }
  get debitlistArray(): FormArray {
    return this.leaveentryForm.get('debitlist') as FormArray;
  }
editleaveentry(item: any): void {
    this.isList = false;
    this.isEdit = true;
    this.loadvalue(item.leaveentryid);
  }
  

  viewleaveentry(item: any): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = true;
    this.loadvalue(item.leaveentryid);
  }

  deleteleaveentry(item: any): void {
    this.commonService.deleteleaveentry(item.leaveentryid).subscribe({
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
cancel(): void {
    this.resetFormAndList();
  }

  onSubmit(): void {
    if (this.leaveentryForm.valid) {
      this.leaveentryForm.get('userid')?.setValue(this.userid);
       if(this.isEdit){
        this.leaveentryForm.get('edit')?.setValue(this.isEdit);
      }
      this.commonService.saveupdateleaveentry(this.leaveentryForm.value).subscribe({
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
  

  loadvalue(leaveentryid: any): void {
    this.commonService.leaveentryEdit(leaveentryid).subscribe({
      next: (data: any) => {
        this.leaveentryForm.patchValue({
            empid:data.empid,
            username:data.username,
            lopdays:data.lopdays,
            lopyear:data.lopyear,
            month:data.month
        });
        let fromdate = data.fromdate; 

        if (fromdate) {
        const parts = fromdate.split('-'); 
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; 
        this.leaveentryForm.get('fromdate')?.setValue(formattedDate);
}
      },
      error: (e: any) => {
        console.error('Error fetching leave Application:', e);
      },
    });
  }
  
  updatePagedData(): void {
    const sourceData = this.searchTerm ? this.filteredData : this.leaveentryList;
    const startIndex = (this.currentPage - 1) * this.itemsByPage;
    const endIndex = startIndex + this.itemsByPage;
    this.pageddata = sourceData.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagedData();
    this.pageChanged.emit(newPage);
  }

  updatePagination(): void {
    const sourceData = this.searchTerm ? this.filteredData : this.leaveentryList;
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
    this.filteredData = this.leaveentryList.filter(
      item =>
        item.leaveapplicid.toLowerCase().includes(term) ||
        item.empid.toLowerCase().includes(term) ||
        item.empname.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.applieddt.toLowerCase().includes(term) ||
        item.fromdt.toLowerCase().includes(term) ||
        item.halfFrom.toLowerCase().includes(term) ||
        item.todt.toLowerCase().includes(term) ||
        item.halfTo.toLowerCase().includes(term) ||
        item.ltname.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  private resetFormAndList(): void {
    this.leaveentryForm.reset();
    this.isEdit = false;
    this.isView = false;
    this.isList = true;
    this.getList(this.userid);
  }
  openAdd(): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = false;
  }
   getList(luser:any): void {
    this.commonService.leaveentryList(luser).subscribe({
      next: (data: any) => {
        this.leaveentryList = data.getleaveentrylList || [];
        this.totalItems = this.leaveentryList.length;
        this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
        this.updatePagedData();
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }
}
