import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent {
holidayid:string='';
  clockedIn: boolean = false;
  isAdmin: boolean = false;
  isList: boolean = true;
  isEdit : boolean = false;
  isView : boolean = false;
  luser:any;
  holidaylist: any[] = [];
  pageholiday: any[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';
    @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    CurrencyForm:FormGroup;
    empList: any;
    fileUrl: string = '';
    filePath: string = '';
    downloadFile: string = '';
      logger: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.CurrencyForm = this.formBuilder.group({
        emojcode:[''],
        emojname: [''],
        emojicon:['',],
        active:[false,],
        edit:[false,]
       });
    }
    ngOnInit(): void {
      const luserid = localStorage.getItem('UserId');
      this.luser = luserid;
      this.isAdmin = this.luser === 'N001';
      const emplist = localStorage.getItem('userlist');
      this.empList = emplist ? JSON.parse(emplist) : [];
      console.log('Employee List:', this.empList); 
      if(this.luser!=""){
        this.CurrencyForm.get('userid')?.setValue(this.luser);
        console.log('Login user Id:', this.luser);
      }
      this.fetchHolidaydetails(this.luser);
    }

    fetchHolidaydetails(luser:any) {
      this.commonService.holidayList(luser).subscribe({
        next: (data: any) => {
          this.holidaylist = data.getholidaylist || [];
          this.totalItems = this.holidaylist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    deleteholiday(item:any) {
      const holidaycode = item.holidaycode;
      this.holidayid=holidaycode;
      console.log(holidaycode);
      this.commonService.deleteholiday(this.holidayid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchHolidaydetails(this.luser);
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

    updatePagedData(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.holidaylist;
      const startIndex = (this.currentPage - 1) * this.itemsByPage;
      const endIndex = startIndex + this.itemsByPage;
      this.pageholiday = sourceData.slice(startIndex, endIndex);
    }
  
    onPageChange(newPage: number): void {
      this.currentPage = newPage;
      this.updatePagedData();
      this.pageChanged.emit(newPage);
    }
  
    updatePagination(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.holidaylist;
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
      const term = this.searchTerm?.toLowerCase() || ''; 
      this.filteredData = this.holidaylist.filter(item =>
          (item.holidaycode?.toLowerCase() || '').includes(term) ||
          (item.hdate?.toLowerCase() || '').includes(term) ||
          (item.hname?.toLowerCase() || '').includes(term) ||
          (item.active?.toString().toLowerCase() || '').includes(term) ||
          (item.status?.toLowerCase() || '').includes(term)
      );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.CurrencyForm.reset();
      this.isEdit = false;
      this.fetchHolidaydetails(this.luser);
  }
  
   detailholiday(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.holidaycode);
    }
    editholiday(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.holidaycode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.CurrencyForm.valid) {
        if(this.isEdit){
          this.CurrencyForm.get('edit')?.setValue(this.isEdit);
        }
        this.commonService.saveholiday(this.CurrencyForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.CurrencyForm.reset();
              this.isEdit = false;
              this.fetchHolidaydetails(this.luser);
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
    fetchdetails(holidayid:any) {
      this.commonService.holidayEdit(holidayid).subscribe({
        next: (data: any) => {
          this.CurrencyForm.patchValue({
            holidaycode:data.holidaycode,
            hdate:data.hdate ,
            hname:data.hname,
            status:data.status,
            active:data.active,
          });
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
  }
  
  openAdd():void{
    this.isList = false;
  }
}
