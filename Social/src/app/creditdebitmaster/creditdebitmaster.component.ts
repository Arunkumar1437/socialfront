import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-creditdebitmaster',
  templateUrl: './creditdebitmaster.component.html',
  styleUrl: './creditdebitmaster.component.css'
})
export class CreditdebitmasterComponent {
  creditdebitid:string='';
  isAdmin: boolean = false;
  isList: boolean = true;
  isEdit : boolean = false;
  isView : boolean = false;
  luser:any;
  creditdebitlist: any[] = [];
  pagecreditdebit: any[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';
    @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    creditdebitForm:FormGroup;
    empList: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.creditdebitForm = this.formBuilder.group({
        creditdebitcode:[''],
        creditdebittype: ['',],
        creditdebitname: ['',],
        userid:['',],
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
        this.creditdebitForm.get('userid')?.setValue(this.luser);
        console.log('Login user Id:', this.luser);
      }
      this.fetchcreditdebitdetails(this.luser);
    }

    fetchcreditdebitdetails(luser:any) {
      this.commonService.creditdebitList(luser).subscribe({
        next: (data: any) => {
          this.creditdebitlist = data.creditdebitlist || [];
          this.totalItems = this.creditdebitlist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    deletecreditdebit(item:any) {
      const creditdebitcode = item.creditdebitcode;
      this.creditdebitid=creditdebitcode;
      console.log(creditdebitcode);
      this.commonService.deletecreditdebit(this.creditdebitid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchcreditdebitdetails(this.luser);
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
      const sourceData = this.searchTerm ? this.filteredData : this.creditdebitlist;
      const startIndex = (this.currentPage - 1) * this.itemsByPage;
      const endIndex = startIndex + this.itemsByPage;
      this.pagecreditdebit = sourceData.slice(startIndex, endIndex);
    }
  
    onPageChange(newPage: number): void {
      this.currentPage = newPage;
      this.updatePagedData();
      this.pageChanged.emit(newPage);
    }
  
    updatePagination(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.creditdebitlist;
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
      this.filteredData = this.creditdebitlist.filter(item =>
          (item.creditdebitcode?.toLowerCase() || '').includes(term) ||
          (item.creditdebitname?.toLowerCase() || '').includes(term) ||
          (item.creditdebittype?.toLowerCase() || '').includes(term) ||
          (item.active?.toString().toLowerCase() || '').includes(term)
      );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.creditdebitForm.reset();
      this.isEdit = false;
      this.fetchcreditdebitdetails(this.luser);
  }
  
   detailcreditdebit(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.creditdebitcode);
    }
    editcreditdebit(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.creditdebitcode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.creditdebitForm.valid) {
        if(this.isEdit){
          this.creditdebitForm.get('edit')?.setValue(this.isEdit);
        }
        this.commonService.saveupdatecreditdebit(this.creditdebitForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.creditdebitForm.reset();
              this.isEdit = false;
              this.fetchcreditdebitdetails(this.luser);
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
    fetchdetails(creditdebitid:any) {
      this.commonService.creditdebitEdit(creditdebitid).subscribe({
        next: (data: any) => {
          this.creditdebitForm.patchValue({
            creditdebitcode:data.creditdebitcode,
            creditdebitname: data.creditdebitname,
            creditdebittype: data.creditdebittype,
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

