import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  attendances: any[] | undefined;
  attendanceid:string='';
  clockedIn: boolean = false;
  isAdmin: boolean = false;
  isList: boolean = true;
  isEdit : boolean = false;
  isView : boolean = false;
  luser:any;
    attendancelist: any[] = [];
    pagedattendance: any[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';
    searchTerm1: string = '';
    @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    attendForm:FormGroup;
    empList: any;
    fileUrl: string = '';
    filePath: string = '';
    downloadFile: string = '';
      logger: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.attendForm = this.formBuilder.group({
        attendancecode:[''],
        empname: ['',Validators.required],
        intime:['',],
        outtime:['',],
        userId:['',],
        duration:['',],
        status:['',],
        edit:this.isEdit
       });
    }
    ngOnInit(): void {
      
      const luserid = localStorage.getItem('UserId');
      this.luser=luserid;
      console.log(luserid);
      if(this.luser==='N001'){
        this.isAdmin = true; 
      }
      const emplist = localStorage.getItem('userlist');
      this.empList=emplist;
      this.fetchAttendances(this.luser);
    }

    fetchAttendances(luser:any) {
      // Fetch attendance records from backend API
      this.commonService.attendanceList(luser).subscribe({
        next: (data: any) => {
          this.attendancelist = data.getattendlist || [];
          this.totalItems = this.attendancelist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    clockIn():void {
      // Send request to clock in
      this.commonService.checkIn(this.luser).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'CheckIn successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',

            });
            this.fetchAttendances(this.luser);
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

    clockOut(item:any) {
     // Send request to clock out
     const attendancecode = item.attendancecode;
     this.attendanceid=attendancecode;
     console.log(attendancecode);
     this.commonService.checkOut(this.attendanceid).subscribe({
       next: (res: any) => {
         if (res.sucess === true) {
           const message = 'Checkout successfully';
           this._snackBar.open(message, '', {
             duration: 3000,
             verticalPosition: 'top',
             horizontalPosition: 'right',

           });
           this.fetchAttendances(this.luser);
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

    deleteAttendance(item:any) {
      // Send request to clock out
      const attendancecode = item.attendancecode;
      this.attendanceid=attendancecode;
      console.log(attendancecode);
      this.commonService.deleteattendance(this.attendanceid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchAttendances(this.luser);
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
      const sourceData = this.searchTerm ? this.filteredData : this.attendancelist;
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
      const sourceData = this.searchTerm ? this.filteredData : this.attendancelist;
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
      this.filteredData = this.attendancelist.filter(item =>
          (item.attendancecode?.toLowerCase() || '').includes(term) ||
          (item.userId?.toLowerCase() || '').includes(term) ||
          (item.empname?.toLowerCase() || '').includes(term) ||
          (item.intime?.toLowerCase() || '').includes(term) ||
          (item.duration?.toLowerCase() || '').includes(term) ||
          (item.status?.toLowerCase() || '').includes(term) ||
          (item.outtime?.toLowerCase() || '').includes(term)
      );
  
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.attendForm.reset();
      this.isEdit = false;
      this.fetchAttendances(this.luser);
  }
  
    viewAttendance(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.attendancecode);
    }
    editAttendance(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.attendancecode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.attendForm.valid) {
        this.commonService.updateattendance(this.attendForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.attendForm.reset();
              this.isEdit = false;
              this.fetchAttendances(this.luser);
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
    fetchdetails(attendanceid:any) {
      this.commonService.attendanceEdit(attendanceid).subscribe({
        next: (data: any) => {
          this.attendancelist = data.getattendlist || [];
          this.attendForm.patchValue({
            attendancecode:data.attendancecode,
            empname: data.empname,
            intime:data.intime,
            outtime:data.outtime,
            userId:data.userId,
            duration:data.duration,
            status:data.status,
          });
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
  }
  Excell():void{
    this.commonService.attendanceExcell(this.luser).subscribe({
      next: (data: any) => {
          if (data.filePath) {
            this.fileUrl = data.filePath;
            this.filePath = data.filePath;
    
            const downloadFilePath = data.filePath.split("/");
            const actualLength = downloadFilePath.length;
            const fileLength = actualLength - 1;
            this.downloadFile = downloadFilePath[fileLength];
    
            console.log(this.downloadFile);
    
            //this.logger.logSuccess("Exported successfully!");
    
            const exportElement = document.getElementById("empDtlExport") as HTMLAnchorElement;
            if (exportElement) {
              exportElement.href = `imgFiles/${this.downloadFile}`;
             
            }
          } else {
            //this.logger.logError("No Record Found!");
          }
        },
        error: (error) => {
          console.error("Error exporting Excel:", error);
          //this.logger.logError("Failed to export file.");
        }
      });
  }
}