import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  
pagedUserRights: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  @Input() totalItems: number = 0;  
  @Input() itemsByPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalItems1: number = 0;  
  @Input() itemsByPage1: number = 10;
  @Input() currentPage1: number = 1;
  @Output() pageChanged1 = new EventEmitter<number>();   
  numPages: number = 1;
  numPages1: number = 1;
  userid: any;
  user: any;
  empForm: FormGroup;
  employeeList: any[] = [];
  userList: any[] = [];
  isList: boolean = true;
  isEdit: boolean = false;
  isView: boolean = false;
  iconlist:any[]=[];

  moduledropdown:any[]=[];
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private commonService: CommonService,
      private _snackBar: MatSnackBar
    ) {
      this.empForm = this.formBuilder.group({
        userId:[''],
        empname: ['',Validators.required],
        emailId: ['',Validators.email],
        active:['',],
        description:['',],
        pass:['',],
        gender:['',],
        edit:this.isEdit
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
      this.commonService.empList().subscribe({
        next: (data: any) => {
          this.employeeList = data.getemplist || [];
          this.totalItems = this.employeeList.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    updatePagedData(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.employeeList;
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
      const sourceData = this.searchTerm ? this.filteredData : this.employeeList;
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
      this.filteredData = this.employeeList.filter(
        item =>
          item.userId.toLowerCase().includes(term) ||
          item.empname.toLowerCase().includes(term)||
          item.emailId.toLowerCase().includes(term) 
          
        );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
              this.empForm.reset();
              this.getList(); 
    }
    
    viewemp(item: any): void {
      this.isList = false;
      this.isEdit = false;
      this.isView = true;
      this.loadvalue(item.userId);
    }
  
    deleteemp(item: any): void {
      this.commonService.empDelete(item.userId).subscribe({
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
    editemp(item: any): void {
      this.isList = false;
      this.isEdit = true;
        this.loadvalue(item.userId);
    }
  
    loadvalue(userId: any): void {
      this.commonService.empedit(userId).subscribe({
        next: (data: any) => {
          this.empForm.patchValue({
            userId:data.userId,
            empname: data.empname,
            emailId:data.emailId ,
            active: data.active,
            description:data.description,
            pass:data.pass,
            gender:data.gender,
          });
  
          
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    openAddForm(): void {
      this.isList = false;
     
    }

    cancel() {
      this.isEdit = false;
      this.isView=false;
      this.isList=true;
    }
 
    clearSelection() {
      this.empForm.controls['icon'].setValue(""); 
    }
    getAdminList(){
      this.commonService.admindata().subscribe({
        next: (data: any) => {
          this.employeeList = data.getemplist || [];
          this.totalItems = this.employeeList.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    getEmpList():void{
      this.commonService.getempdata().subscribe({
        next: (data: any) => {
          this.employeeList = data.getemplist || [];
          this.totalItems = this.employeeList.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    submit(): void {
      if (this.empForm.valid) {
        if(!this.isEdit){
        this.commonService.saveempData(this.empForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
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
      }else{
        this.commonService.updateempData(this.empForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = 'Update successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
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
  }
}

