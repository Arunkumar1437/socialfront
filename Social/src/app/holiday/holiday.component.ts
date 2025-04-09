import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {
  attendances: any[] | undefined;
  taskid:string='';
  clockedIn: boolean = false;
  isAdmin: boolean = false;
  isList: boolean = true;
  isEdit : boolean = false;
  isView : boolean = false;
  luser:any;
    tasklist: any[] = [];
    pagedattendance: any[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';
    @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    holidayForm:FormGroup;
    empList: any;
    fileUrl: string = '';
    filePath: string = '';
    downloadFile: string = '';
      logger: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.holidayForm = this.formBuilder.group({
        taskcode:[''],
        empname: ['',Validators.required],
        ttitle:['',],
        tdesc:['',],
        userId:['',],
        stime:['',],
        etime:['',],
        days:['',],
        status:['',],
        assignedby:['',],
        assignedto:['',],
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
      
      this.fetchTaskdetails(this.luser);
    }
    

    fetchTaskdetails(luser:any) {
      this.commonService.taskList(luser).subscribe({
        next: (data: any) => {
          this.tasklist = data.gettasklist || [];
          this.totalItems = this.tasklist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    deletetask(item:any) {
      const taskcode = item.taskcode;
      this.taskid=taskcode;
      console.log(taskcode);
      this.commonService.deletetask(this.taskid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchTaskdetails(this.luser);
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
      const sourceData = this.searchTerm ? this.filteredData : this.tasklist;
      const startIndex = (this.currentPage - 1) * this.itemsByPage;
      const endIndex = startIndex + this.itemsByPage;
      this.pagedattendance = sourceData.slice(startIndex, endIndex);
    }
  
    onPageChange(newPage: number): void {
      this.currentPage = newPage;
      this.updatePagedData();
      this.pageChanged.emit(newPage);
    }
  
    updatePagination(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.tasklist;
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
      this.filteredData = this.tasklist.filter(item =>
          (item.taskcode?.toLowerCase() || '').includes(term) ||
          (item.ttitle?.toLowerCase() || '').includes(term) ||
          (item.tdesc?.toLowerCase() || '').includes(term) ||
          (item.stime?.toLowerCase() || '').includes(term) ||
          (item.etime?.toLowerCase() || '').includes(term) ||
          (item.days?.toString().toLowerCase() || '').includes(term)||
          (item.empname?.toLowerCase() || '').includes(term)||
          (item.userId?.toLowerCase() || '').includes(term) ||
          (item.status?.toLowerCase() || '').includes(term)
      );
  
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.holidayForm.reset();
      this.isEdit = false;
      this.fetchTaskdetails(this.luser);
  }
  
   detailtask(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.taskcode);
    }
    edittask(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.taskcode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.holidayForm.valid) {
        if(this.isEdit){
          this.holidayForm.get('edit')?.setValue(this.isEdit);
        }
        this.commonService.savetask(this.holidayForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.holidayForm.reset();
              this.isEdit = false;
              this.fetchTaskdetails(this.luser);
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
    fetchdetails(taskid:any) {
      this.commonService.taskEdit(taskid).subscribe({
        next: (data: any) => {
          this.holidayForm.patchValue({
            taskcode:data.taskcode,
            empname: data.empname,
            ttitle:data.ttitle,
            tdesc:data.tdesc,
            userId:data.userId,
            stime:data.stime,
            etime:data.etime,
            days:data.days,
            status:data.status,
            assignedby:data.assignedby,
            assignedto:data.assignedto,
          });
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
  }
  Excell():void{
    this.commonService.taskExcell(this.luser).subscribe({
      next: (data: any) => {
          if (data.filePath) {
            this.fileUrl = data.filePath;
            this.filePath = data.filePath;
            const downloadFilePath = data.filePath.split("/");
            const actualLength = downloadFilePath.length;
            const fileLength = actualLength - 1;
            this.downloadFile = downloadFilePath[fileLength];
            console.log(this.downloadFile);
            const exportElement = document.getElementById("empDtlExport") as HTMLAnchorElement;
            if (exportElement) {
              exportElement.href = `imgFiles/${this.downloadFile}`;
            }
          } else {
          }
        },
        error: (error) => {
          console.error("Error exporting Excel:", error);
        }
      });
  }
  openAdd():void{
    this.isList = false;
  }
}
