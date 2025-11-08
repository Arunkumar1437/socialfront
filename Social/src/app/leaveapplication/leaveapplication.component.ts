import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-leaveapplication',
  templateUrl: './leaveapplication.component.html',
  styleUrl: './leaveapplication.component.css'
})
export class LeaveapplicationComponent implements OnInit {
  leaveapplicForm: FormGroup;
  leavedetail: any[] = [];
  leaveappliclList: any[] = [];
  pageddata: any[] = [];
  filteredData: any[] = [];
  userRightsview: any[] = [];

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
    this.leaveapplicForm = this.formBuilder.group({
      empid:[''],
      empname:[''],
      description:[''],
      userid: [''],
      fromdt:[''],
      todt:[''],
      halfFrom:[''],
      halfTo:[''],
      days: [''],
      leaveapplicid:[''],
      applieddt:[''],
      status:[''],
      edit: [false,],
      leavedetaillist: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('UserId');
    this.username=localStorage.getItem('username');
 
    if(this.userid!=""){
      this.leaveapplicForm.get('userid')?.setValue(this.userid);
      this.leaveapplicForm.get('empid')?.setValue(this.userid);
      this.leaveapplicForm.get('empname')?.setValue(this.username);
      console.log('Login user Id:', this.userid);
      console.log('Login user Name:', this.username);
    }
      if(!this.isEdit){
        this.getleaveDetails(this.userid);
      }
    this.getList(this.userid);
    this.leaveapplicForm.get('fromdt')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });
    this.leaveapplicForm.get('todt')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });
    this.leaveapplicForm.get('halfFrom')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });
    this.leaveapplicForm.get('halfTo')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });
  }

  get leavedetaillistArray(): FormArray {
    return this.leaveapplicForm.get('leavedetaillist') as FormArray;
  }

  getleaveDetails(emp:any): void {
    this.commonService.empleavedetails(emp).subscribe({
      next: (data: any) => {
        const leavedetailadd = data.empleavedetail || [];
        this.leavedetaillistArray.clear();
        leavedetailadd.forEach((item: any) => {
          this.leavedetaillistArray.push(this.formBuilder.group({
            select:[false],
            leavetypecode: [item.leavetypecode],
            ltname: [item.ltname],
            balance: [item.balance],
            available: [item.available],
            consumed: [item.consumed]
          }));
        });
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }

  onSubmit(): void {
    if (this.leaveapplicForm.valid) {
      if(this.isEdit){
        this.leaveapplicForm.get('edit')?.setValue(this.isEdit);
        this.leaveapplicForm.get('userid')?.setValue(this.userid);
      }
    const leavedetails = this.leaveapplicForm.get('leavedetaillist')?.value;
    const isAnySelected = leavedetails?.some((item: any) => item.select === true);

    if (!isAnySelected && !this.isEdit) {
      this._snackBar.open('Please select at least one leave type before submitting.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return; 
    }else{
      this.commonService.saveleaveapplic(this.leaveapplicForm.value).subscribe({
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
  }

  openAdd(): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = false;
  }

  cancel(): void {
    this.resetFormAndList();
  }

  getList(luser:any): void {
    this.commonService.leaveentryList(luser).subscribe({
      next: (data: any) => {
        this.leaveappliclList = data.getleaveappliclList || [];
        this.totalItems = this.leaveappliclList.length;
        this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
        this.updatePagedData();
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }

  editleaveapplic(item: any): void {
    this.isList = false;
    this.isEdit = true;
    this.loadvalue(item.leaveapplicid);
  }

  loadvalue(leaveapplicid: any): void {
    this.commonService.editlleaveapplic(leaveapplicid).subscribe({
      next: (data: any) => {
        this.leaveapplicForm.patchValue({
          leaveapplicid:data.leaveapplicid,
            leavetypecode: data.leavetypecode,
            ltname:data.ltname,
            minimum:data.minimum,
            maximum:data.maximum,
            empid:data.empid,
            empname:data.empname,
            applieddt:data.applieddt,
            description:data.description,
            fromdt:data.fromdt,
            todt:data.todt,
            halfFrom:data.halfFrom,
            halfTo:data.halfTo,
            days: data.days, 
            status:data.status 
        });
      },
      error: (e: any) => {
        console.error('Error fetching leave Application:', e);
      },
    });
  }
  

  viewleaveapplic(item: any): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = true;
    this.loadvalue(item.leaveapplicid);
  }

  deleteleaveapplic(item: any): void {
    this.commonService.leaveapplicDelete(item.leaveapplicid).subscribe({
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
    const sourceData = this.searchTerm ? this.filteredData : this.leaveappliclList;
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
    const sourceData = this.searchTerm ? this.filteredData : this.leaveappliclList;
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
    this.filteredData = this.leaveappliclList.filter(
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
    this.leaveapplicForm.reset();
    this.isEdit = false;
    this.isView = false;
    this.isList = true;
    this.getList(this.userid);
  }
  onLeaveSelectChange(selectedIndex: number): void {
    this.leavedetaillistArray.controls.forEach((control, index) => {
      if (index !== selectedIndex) {
        control.get('select')?.setValue(false, { emitEvent: false });
      }
    });
  }
  calculateDays(): void {
    const fromDate = this.leaveapplicForm.get('fromdt')?.value;
    const toDate = this.leaveapplicForm.get('todt')?.value;
    const halfFrom = this.leaveapplicForm.get('halfFrom')?.value;
    const halfTo = this.leaveapplicForm.get('halfTo')?.value;
  
    if (fromDate && toDate && halfFrom && halfTo) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      let diffDays = (to.getTime() - from.getTime()) / (1000 * 3600 * 24) + 1;
      if (diffDays === 1) {
        if (halfFrom === 'First' && halfTo === 'First') diffDays = 0.5;
        else if (halfFrom === 'Second' && halfTo === 'Second') diffDays = 0.5;
        else if (halfFrom !== halfTo) diffDays = 1.0;
      } else {
        if (halfFrom === 'Second') diffDays -= 0.5;
        if (halfTo === 'First') diffDays -= 0.5;
      }
      this.leaveapplicForm.get('days')?.setValue(diffDays);
    } else {
      this.leaveapplicForm.get('days')?.setValue(0.0);
    }
  }
  
}