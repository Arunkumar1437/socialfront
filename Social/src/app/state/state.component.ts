import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrl: './state.component.css'
})
export class StateComponent {
stateid:string='';
  isAdmin: boolean = false;
  isList: boolean = true;
  isEdit : boolean = false;
  isView : boolean = false;
  luser:any;
   countrylist: any[] = [];
  statelist: any[] = [];
  pagestate: any[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';
    @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    StateForm:FormGroup;
    empList: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.StateForm = this.formBuilder.group({
        statecode:[''],
        statename: [''],
        statecountry:[0,],
        statesymbol:['',],
        active:[false,],
        edit:[false,],
        userid:['']
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
        this.StateForm.get('userid')?.setValue(this.luser);
        console.log('Login user Id:', this.luser);
      }
      this.fetchStatedetails(this.luser);
      this.fetchregionlist();
    }

    fetchStatedetails(luser:any) {
      this.commonService.stateList(luser).subscribe({
        next: (data: any) => {
          this.statelist = data.getstatebeanlist || [];
          this.totalItems = this.statelist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    fetchregionlist() {
      this.commonService.getcountrydrop().subscribe({
        next: (data: any) => {
          this.countrylist = data.getcountry || [];
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    delete(item:any) {
      const statecode = item.statecode;
      this.stateid=statecode;
      console.log(statecode);
      this.commonService.deletestate(this.stateid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchStatedetails(this.luser);
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
      const sourceData = this.searchTerm ? this.filteredData : this.statelist;
      const startIndex = (this.currentPage - 1) * this.itemsByPage;
      const endIndex = startIndex + this.itemsByPage;
      this.pagestate = sourceData.slice(startIndex, endIndex);
    }
  
    onPageChange(newPage: number): void {
      this.currentPage = newPage;
      this.updatePagedData();
      this.pageChanged.emit(newPage);
    }
  
    updatePagination(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.statelist;
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
      this.filteredData = this.statelist.filter(item =>
          (item.currencycode?.toLowerCase() || '').includes(term) ||
          (item.hdate?.toLowerCase() || '').includes(term) ||
          (item.hname?.toLowerCase() || '').includes(term) ||
          (item.active?.toString().toLowerCase() || '').includes(term) ||
          (item.status?.toLowerCase() || '').includes(term)
      );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.StateForm.reset();
      this.isEdit = false;
      this.fetchStatedetails(this.luser);
  }
  
   detail(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.statecode);
    }
    edit(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.statecode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.StateForm.valid) {
        if(this.isEdit){
          this.StateForm.get('edit')?.setValue(this.isEdit);
        }
        this.commonService.savestate(this.StateForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.StateForm.reset();
              this.isEdit = false;
              this.fetchStatedetails(this.luser);
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
    fetchdetails(stateid:any) {
      this.commonService.stateEdit(stateid).subscribe({
        next: (data: any) => {
          this.StateForm.patchValue({
            statecode:data.statecode,
            statename:data.statename,
            statecountry:data.statecountry,
            statesymbol:data.statesymbol,
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
