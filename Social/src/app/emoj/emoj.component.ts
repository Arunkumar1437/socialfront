import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-emoj',
  templateUrl: './emoj.component.html',
  styleUrl: './emoj.component.css'
})
export class EmojComponent {
 emojid:string='';
  clockedIn: boolean = false;
  isAdmin: boolean = false;
  isList: boolean = true;
  isEdit : boolean = false;
  isView : boolean = false;
  luser:any;
  emojlist: any[] = [];
  pageemoj: any[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';
    @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 5;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    EmojForm:FormGroup;
    empList: any;
    fileUrl: string = '';
    filePath: string = '';
    downloadFile: string = '';
      logger: any;
  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder ) {
      this.EmojForm = this.formBuilder.group({
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
        this.EmojForm.get('userid')?.setValue(this.luser);
        console.log('Login user Id:', this.luser);
      }
      this.fetchEmojdetails(this.luser);
    }

    fetchEmojdetails(luser:any) {
      this.commonService.emojList(luser).subscribe({
        next: (data: any) => {
          this.emojlist = data.getemojlist || [];
          this.totalItems = this.emojlist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    deleteemoj(item:any) {
      const emojcode = item.emojcode;
      this.emojid=emojcode;
      console.log(emojcode);
      this.commonService.deleteemoj(this.emojid).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Deleted successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
 
            });
            this.fetchEmojdetails(this.luser);
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
      const sourceData = this.searchTerm ? this.filteredData : this.emojlist;
      const startIndex = (this.currentPage - 1) * this.itemsByPage;
      const endIndex = startIndex + this.itemsByPage;
      this.pageemoj = sourceData.slice(startIndex, endIndex);
    }
  
    onPageChange(newPage: number): void {
      this.currentPage = newPage;
      this.updatePagedData();
      this.pageChanged.emit(newPage);
    }
  
    updatePagination(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.emojlist;
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
      this.filteredData = this.emojlist.filter(item =>
          (item.holidaycode?.toLowerCase() || '').includes(term) ||
          (item.hdate?.toLowerCase() || '').includes(term) ||
          (item.hname?.toLowerCase() || '').includes(term) ||
          (item.active?.toString().toLowerCase() || '').includes(term) ||
          (item.status?.toLowerCase() || '').includes(term)
      );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
      this.EmojForm.reset();
      this.isEdit = false;
      this.fetchEmojdetails(this.luser);
  }
  
   detailemoj(item:any){
      this.isList=false;
      this.isEdit=false;
      this.isView=true;
      this.fetchdetails(item.emojcode);
    }
    editemoj(item:any){
      this.isList=false;
      this.isEdit=true;
      this.isView=false;
      this.fetchdetails(item.emojcode);
    }
    cancel():void{
      this.isEdit=false;
      this.isList=true;
      this.isView=false;
    }
    submit():void{
      if (this.EmojForm.valid) {
        if(this.isEdit){
          this.EmojForm.get('edit')?.setValue(this.isEdit);
        }
        this.commonService.saveemoj(this.EmojForm.value).subscribe({
          next: (res: any) => {
            if (res.sucess === true) {
              const message = this.isEdit ? 'Update successfully' : 'Saved successfully';
              this._snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              this.isList = true;
              this.EmojForm.reset();
              this.isEdit = false;
              this.fetchEmojdetails(this.luser);
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
    fetchdetails(emojid:any) {
      this.commonService.emojEdit(emojid).subscribe({
        next: (data: any) => {
          this.EmojForm.patchValue({
            emojcode:data.emojcode,
            emojname:data.emojname ,
            emojicon:data.emojicon,
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
