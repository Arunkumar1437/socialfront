import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  
pagedUserRights: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  @Input() totalItems: number = 0;  
  @Input() itemsByPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalItems1: number = 0;  
  @Input() itemsByPage1: number = 5;
  @Input() currentPage1: number = 1;
  @Output() pageChanged1 = new EventEmitter<number>();   
  numPages: number = 1;
  numPages1: number = 1;
  moduleForm: FormGroup;
  userid: any;
  user: any;
  formForm: FormGroup;
  formList: any[] = [];
  userList: any[] = [];
  isList: boolean = true;
  isEdit: boolean = false;
  isView: boolean = false;
  iconlist:any[]=[];
  moduleList: any[] = [];
  pagedmodule: any[]= [];
  filteredData1: any[] = [];
  searchTerm1: string = '';
  isform: boolean = false;
  ismaster: boolean = false;
  isformview: boolean = false;
  ismasterview: boolean = false;
  moduledropdown:any[]=[];
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private commonService: CommonService,
      private _snackBar: MatSnackBar
    ) {
      this.formForm = this.formBuilder.group({
        formid:[''],
        formname: ['',Validators.required],
        icon: ['',],
        displayorder: ['',],
        redirect: ['',],
        link: ['',],
        active:['',],
        userid:[],
        iconemoj:['',],
        modulecode:['',],
        edit:this.isEdit
      });
      this.moduleForm = this.formBuilder.group({
        modulecode:[''],
        modulename: ['',Validators.required],
        active:['',],
        userid:[],
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
      this.getModuleList();
    }

    getList(): void {
      this.commonService.formList().subscribe({
        next: (data: any) => {
          this.formList = data.formlist || [];
          this.iconlist=data.iconlist||[];
          this.moduledropdown=data.moduledropdown||[];
          this.totalItems = this.formList.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }
    updatePagedData(): void {
      const sourceData = this.searchTerm ? this.filteredData : this.formList;
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
      const sourceData = this.searchTerm ? this.filteredData : this.formList;
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
      this.filteredData = this.formList.filter(
        item =>
          item.formid.toLowerCase().includes(term) ||
          item.formname.toLowerCase().includes(term)||
          item.icon.toLowerCase().includes(term) ||
          item.displayorder.toString().includes(term) ||  
          item.redirect.toLowerCase().includes(term) ||
          item.link.toLowerCase().includes(term)||
          item.active.toString().toLowerCase().includes(term) 
        );
      this.currentPage = 1; 
      this.updatePagination();
      this.isList = true;
              this.formForm.reset();
              this.getList(); 
    }
    
    viewform(item: any): void {
      this.isList = false;
      this.isEdit = false;
      this.isView = true;
      this.ismasterview=false;
      this.isformview=true;
      this.loadvalue(item.formid);
    }
  
    deleteForm(item: any): void {
      this.commonService.formDelete(item.formid).subscribe({
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
    editForm(item: any): void {
      this.isList = false;
      this.isEdit = true;
      this.ismaster=false;
      this.isform=true;
        this.loadvalue(item.formid);
    }
  
    loadvalue(formid: any): void {
      this.commonService.formedit(formid).subscribe({
        next: (data: any) => {
          this.formForm.patchValue({
            formid:data.formid,
            formname: data.formname,
            icon:data.icon ,
            displayorder: data.displayorder,
            redirect: data.redirect,
            link: data.link,
            active:data.active,
            modulecode:data.modulecode,
            iconemoj:data.iconemoj,
          });
  
          
        },
        error: (e: any) => {
          console.error('Error fetching data:', e);
        },
      });
    }

    openAddForm(): void {
      this.isList = false;
      this.isform=true;
      this.ismaster=false;
    }

    cancel() {
      this.isEdit = false;
      this.isView=false;
      this.isList=true;
    }
 
    clearSelection() {
      this.formForm.controls['icon'].setValue(""); 
    }

    submit(): void {
      if (this.formForm.valid) {
        if(!this.isEdit){
        this.commonService.saveformData(this.formForm.value).subscribe({
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
        this.commonService.updateformData(this.formForm.value).subscribe({
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

  submitmodule(): void {
    if (this.moduleForm.valid) {
      if(!this.isEdit){
      this.commonService.savemoduleData(this.moduleForm.value).subscribe({
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
            this.getModuleList();
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
      this.commonService.updatemoduleData(this.moduleForm.value).subscribe({
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
            this.getModuleList();
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

getModuleList(): void {
  this.commonService.moduleList().subscribe({
    next: (data: any) => {
      this.moduleList = data.modulelist || [];
      this.totalItems1 = this.moduleList.length;
      this.numPages1 = Math.ceil(this.totalItems1 / this.itemsByPage1);  
      this.updatePagedData1(); 
    },
    error: (e: any) => {
      console.error('Error fetching data:', e);
    },
  });
}
updatePagedData1(): void {
  const sourceData = this.searchTerm1 ? this.filteredData1 : this.moduleList;
  const startIndex = (this.currentPage1 - 1) * this.itemsByPage1;
  const endIndex = startIndex + this.itemsByPage1;
  this.pagedmodule = sourceData.slice(startIndex, endIndex);
}

onPageChange1(newPage: number): void {
  this.currentPage1 = newPage;
  this.updatePagedData1();
  this.pageChanged.emit(newPage);
}
updatePagination1(): void {
  const sourceData = this.searchTerm1 ? this.filteredData1 : this.moduleList;
  this.totalItems1 = sourceData.length;
  this.numPages1 = Math.ceil(this.totalItems1 / this.itemsByPage1);

  if (this.currentPage1 > this.numPages1) {
    this.currentPage1 = this.numPages1;
  }

  this.updatePagedData1();
  this.pageChanged1.emit(this.currentPage1);
}

selectPage1(page: number) {
  if (page < 1 || page > this.numPages1) {
    return;
  }
  this.currentPage1 = page;
  this.updatePagedData1();
}

onPageNumberChange1(): void {
  if (this.currentPage1 < 1) {
    this.currentPage1 = 1;
  } else if (this.currentPage1 > this.numPages1) {
    this.currentPage1 = this.numPages1;
  }

  this.updatePagedData1();
}
filterTable1(): void {
  const term = this.searchTerm1.toLowerCase();
  this.filteredData1 = this.moduleList.filter(
    item =>
      item.modulecode.toLowerCase().includes(term) ||
      item.modulename.toLowerCase().includes(term)||
      item.active.toString().toLowerCase().includes(term) 
    );
  this.currentPage = 1; 
  this.updatePagination1();
  this.isList = true;
          this.formForm.reset();
          this.getModuleList(); 
}

openAddModule(): void {
  this.isList = false;
  this.isform=false;
  this.ismaster=true;
}
editmodule(item1: any): void {
  this.isList = false;
  this.isEdit = true;
  this.ismaster=true;
  this.isform=false;

    this.loadvalue1(item1.modulecode);
}
viewmodule(item1: any): void {
  this.isList = false;
  this.isEdit = false;
  this.isView = true;
  this.isformview=false;
  this.ismasterview=true;
  this.loadvalue1(item1.modulecode);
}

deletemodule(item: any): void {
  this.commonService.moduleDelete(item.modulecode).subscribe({
    next: (data: any) => {
      if (data.sucess) {
        this._snackBar.open('Deleted successfully', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.getModuleList();
      }
    },
    error: (e: any) => {
      console.error('Error deleting data:', e);
    },
  });
}

loadvalue1(moduleid: any): void {
  this.commonService.moduleedit(moduleid).subscribe({
    next: (data: any) => {
      this.moduleForm.patchValue({
        modulecode:data.modulecode,
        modulename: data.modulename,
        active:data.active,
      });

      
    },
    error: (e: any) => {
      console.error('Error fetching data:', e);
    },
  });
}
}

