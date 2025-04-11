import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrl: './leavetype.component.css'
})
export class LeavetypeComponent {
 attendances: any[] | undefined;
 leavetypeid:string='';
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
    leavetypeForm:FormGroup;
    empList: any;
    fileUrl: string = '';
    filePath: string = '';
    downloadFile: string = '';
      logger: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.leavetypeForm = this.formBuilder.group({
        leavetypecode:[''],
        ltname: ['',],
        ltfor: ['',],
        carryfwd:[false,],
        cryfwdlimit: ['',],
        cryfwdfor: ['',],
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
        this.leavetypeForm.get('userid')?.setValue(this.luser);
        console.log('Login user Id:', this.luser);
      }
      this.fetchLeaveTypedetails(this.luser);
    }

    fetchLeaveTypedetails(luser:any) {
      this.commonService.leavetypeList(luser).subscribe({
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

    deleteleavetype(item:any) {
      const leavetypecode = item.leavetypecode;
      this.leavetypeid=leavetypecode;
      console.log(leavetypecode);
      this.commonService.deleteleavetype(this.leavetypeid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchLeaveTypedetails(this.luser);
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
          (item.leavetypecode?.toLowerCase() || '').includes(term) ||
          (item.ltname?.toLowerCase() || '').includes(term) ||
          (item.ltfor?.toLowerCase() || '').includes(term) ||
          (item.carryfwd?.toString().toLowerCase() || '').includes(term) ||
          (item.cryfwdlimit?.toString().toLowerCase() || '').includes(term) ||
          (item.cryfwdfor?.toLowerCase() || '').includes(term) ||
          (item.active?.toString().toLowerCase() || '').includes(term)
      );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.leavetypeForm.reset();
      this.isEdit = false;
      this.fetchLeaveTypedetails(this.luser);
  }
  
   detailleavetype(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.leavetypecode);
    }
    editleavetype(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.leavetypecode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.leavetypeForm.valid) {
        if(this.isEdit){
          this.leavetypeForm.get('edit')?.setValue(this.isEdit);
        }
        this.commonService.saveupdateleaveType(this.leavetypeForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.leavetypeForm.reset();
              this.isEdit = false;
              this.fetchLeaveTypedetails(this.luser);
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
      this.commonService.leavetypeEdit(holidayid).subscribe({
        next: (data: any) => {
          this.leavetypeForm.patchValue({
            leavetypecode:data.leavetypecode,
            ltname: data.ltname,
            ltfor: data.ltfor,
            carryfwd:data.carryfwd,
            cryfwdlimit: data.cryfwdlimit,
            cryfwdfor: data.cryfwdfor,
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
