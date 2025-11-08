import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-salaryfixation',
  templateUrl: './salaryfixation.component.html',
  styleUrl: './salaryfixation.component.css'
})
export class SalaryfixationComponent implements OnInit {
  salaryfixationForm: FormGroup;
  leavedetail: any[] = [];
  salaryfixationList: any[] = [];
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
    this.salaryfixationForm = this.formBuilder.group({
      empid:[''],
      username:[''],
      grosspay:[0.0],
      fromdate:[''],
      grossdeduct:[0.0],
      netpay:[0.0],
      edit: [false,],
      creditlist: this.formBuilder.array([]),
      debitlist: this.formBuilder.array([])
    });
  }

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
      this.salaryfixationForm.get('userid')?.setValue(this.userid);
      this.salaryfixationForm.get('empid')?.setValue(this.userid);
      this.salaryfixationForm.get('empname')?.setValue(this.username);
      console.log('Login user Id:', this.userid);
      console.log('Login user Name:', this.username);
    }
      if(!this.isEdit){
        this.getcreditdebitDetails();
      }
    this.getList(this.userid);
    this.getList(this.userid);
    this.salaryfixationForm.get('creditlist')?.valueChanges.subscribe(() => {
    this.calculateTotals();
    });

    this.salaryfixationForm.get('debitlist')?.valueChanges.subscribe(() => {
    this.calculateTotals();
    }); 
   }

  get creditlistArray(): FormArray {
    return this.salaryfixationForm.get('creditlist') as FormArray;
  }
  get debitlistArray(): FormArray {
    return this.salaryfixationForm.get('debitlist') as FormArray;
  }

  getcreditdebitDetails(): void {
    this.commonService.creditdibitdetails().subscribe({
      next: (data: any) => {
        const creditlist = data.creditlist || [];
        const debitlist = data.debitlist || [];
        this.creditlistArray.clear();
         this.debitlistArray.clear();
        creditlist.forEach((item: any) => {
          this.creditlistArray.push(this.formBuilder.group({
            creditdebitcode: [item.creditdebitcode],
            creditdebitname: [item.creditdebitname],
            amount: [0.0],
            salaryfixid:['']
          }));
        });

        debitlist.forEach((item: any) => {
          this.debitlistArray.push(this.formBuilder.group({
            creditdebitcode: [item.creditdebitcode],
            creditdebitname: [item.creditdebitname],
            amount: [0.0],salaryfixid:['']
          }));
        });
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }

  onSubmit(): void {
    if (this.salaryfixationForm.valid) {
      if(this.isEdit){
        this.salaryfixationForm.get('edit')?.setValue(this.isEdit);
        this.salaryfixationForm.get('userid')?.setValue(this.userid);
      }
      this.commonService.saveupdatesalaryfixation(this.salaryfixationForm.value).subscribe({
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

  openAdd(): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = false;
  }

  cancel(): void {
    this.resetFormAndList();
  }

  getList(luser:any): void {
    this.commonService.salaryfixationlList(luser).subscribe({
      next: (data: any) => {
        this.salaryfixationList = data.salaryfixationlist || [];
        this.totalItems = this.salaryfixationList.length;
        this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
        this.updatePagedData();
      },
      error: (e: any) => console.error('Error fetching data:', e)
    });
  }

  editsalaryfixation(item: any): void {
    this.isList = false;
    this.isEdit = true;
    this.loadvalue(item.empid);
  }

  loadvalue(empid: any): void {
    this.commonService.salaryfixationEdit(empid).subscribe({
      next: (data: any) => {
        this.salaryfixationForm.patchValue({
            empid:data.empid,
            username:data.username,
            debitlist:data.debitlist,
            creditlist:data.creditlist,
            fromdate:data.fromdate,
        });
        let fromdate = data.fromdate; 

        if (fromdate) {
        const parts = fromdate.split('-'); 
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; 
        this.salaryfixationForm.get('fromdate')?.setValue(formattedDate);
}
      },
      error: (e: any) => {
        console.error('Error fetching leave Application:', e);
      },
    });
  }
  

  viewsalaryfixation(item: any): void {
    this.isList = false;
    this.isEdit = false;
    this.isView = true;
    this.loadvalue(item.empid);
  }

  deletesalaryfixation(item: any): void {
    this.commonService.salaryfixationDelete(item.empid).subscribe({
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
    const sourceData = this.searchTerm ? this.filteredData : this.salaryfixationList;
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
    const sourceData = this.searchTerm ? this.filteredData : this.salaryfixationList;
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
  this.filteredData = this.salaryfixationList.filter(item => 
    String(item.empid).toLowerCase().includes(term) ||
    String(item.username).toLowerCase().includes(term) ||
    String(item.grosspay).toLowerCase().includes(term) ||
    String(item.grossdeduct).toLowerCase().includes(term) ||
    String(item.fromdate).toLowerCase().includes(term) ||
    String(item.netpay).toLowerCase().includes(term)
  );
    this.currentPage = 1;
    this.updatePagination();
  }

  private resetFormAndList(): void {
    this.salaryfixationForm.reset();
    this.isEdit = false;
    this.isView = false;
    this.isList = true;
    this.getList(this.userid);
  }
  onLeaveSelectChange(selectedIndex: number): void {
    this.creditlistArray.controls.forEach((control, index) => {
      if (index !== selectedIndex) {
        control.get('select')?.setValue(false, { emitEvent: false });
      }
    });
  }
  calculateTotals() {
  let grosspay = 0;
  let grossdebit = 0;
  
  const creditArray = this.salaryfixationForm.get('creditlist')?.value || [];
  creditArray.forEach((item: any) => {
    const amount = parseFloat(item.amount) || 0;
    grosspay += amount;
  });
  const debitArray = this.salaryfixationForm.get('debitlist')?.value || [];
  debitArray.forEach((item: any) => {
    const amount = parseFloat(item.amount) || 0;
    grossdebit += amount;
  });
const netpay = grosspay - grossdebit;
  this.salaryfixationForm.get('grosspay')?.setValue(grosspay);
  this.salaryfixationForm.get('grossdeduct')?.setValue(grossdebit);
    this.salaryfixationForm.get('netpay')?.setValue(netpay);

}

  
}
