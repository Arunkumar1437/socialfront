import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  formList: any[] = [];
  userList: any[] = [];
  formdetaillist: any[] = [];
  isList: boolean = true;
  userrightslist: any[] = [];
  isEdit: boolean = false;
  isView: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      edit:[false,],
      formdetaillist: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.getFormDetails();
    this.getList();
  }

  // Getter for form array
  get formdetaillistArray(): FormArray {
    return this.adminForm.get('formdetaillist') as FormArray;
  }

  getFormDetails(): void {
    this.commonService.formdetails().subscribe({
      next: (data: any) => {
        this.formList = data.formlist || [];
        this.userList = data.userlist || [];
        this.formdetaillist = data.formdetaillist || [];
        this.populateFormDetails();
      },
      error: (e: any) => {
        console.error('Error fetching data:', e);
      },
    });
  }

  populateFormDetails(): void {
    this.formdetaillistArray.clear();
    this.formdetaillist.forEach((item: any) => {
      this.formdetaillistArray.push(
        this.formBuilder.group({
          formid: [item.formid],
          formname: [item.formname],
          all: [false],
          create: [false],
          read: [false],
          update: [false],
          delete: [false],
        })
      );
    });
  }

  toggleAll(index: number): void {
    const group = this.formdetaillistArray.at(index) as FormGroup;
    const isChecked = group.get('all')?.value;

    group.patchValue({
      create: isChecked,
      read: isChecked,
      update: isChecked,
      delete: isChecked,
    });
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      this.commonService.saveuserrightData(this.adminForm.value).subscribe({
        next: (res: any) => {
          if (res.success === true && !this.isEdit) { 
            this.isList = true; 
            
            this._snackBar.open('Saved successfully', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.adminForm.reset();
            this.router.navigate(['/Admin/admin']);
          }else if (res.success === true && this.isEdit) { 
            this.isList = true; 
            this._snackBar.open('Update successfully', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.adminForm.reset();
            this.router.navigate(['/Admin/admin']);
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
  

  openAddUserrights(): void {
    this.isList = false;
  }

  cancel(): void {
    this.isList = true;
  }

  getList(): void {
    this.commonService.userList().subscribe({
      next: (data: any) => {
        this.userrightslist = data.userrightslist || [];
      },
      error: (e: any) => {
        console.error('Error fetching data:', e);
      },
    });
  }

  editUserrights(item: any): void {
    this.isList = false;
    this.isEdit = true;
    const usernameControl = this.adminForm.get('username');
    const usernameControl1 = this.adminForm.get('edit');

    if (usernameControl && usernameControl1) {
      usernameControl.setValue(item.userid);
      usernameControl1.setValue(this.isEdit);
      this.loadvalue(item.userid);
    } else {
      console.error("Form control 'username' does not exist.");
    }
  }

  // loadvalue(userid: any): void {
  //   this.commonService.useredit(userid).subscribe({
  //     next: (data: any) => {
  //       this.formdetaillistArray.clear();
  //       const userRightsEdit = data.userrightsedit || [];
  //       userRightsEdit.forEach((item: any) => {
  //         this.formdetaillistArray.push(
  //           this.formBuilder.group({
  //             formid: [item.formid],
  //             formname: [item.formname || ''],
  //             all: [item.all || false],
  //             create: [item.create || false],
  //             read: [item.read || false],
  //             update: [item.update || false],
  //             delete: [item.delete || false],
  //           })
  //         );
  //       });
  //     },
  //     error: (e: any) => {
  //       console.error('Error fetching data:', e);
  //     },
  //   });
  // }

  loadvalue(userid: any): void {
  this.commonService.useredit(userid).subscribe({
    next: (data: any) => {
      this.formdetaillistArray.clear();
      const userRightsEdit = data.userrightsedit || [];

      userRightsEdit.forEach((item: any, index: number) => {
        const group = this.formBuilder.group({
          formid: [item.formid],
        formname: [item.formname],
        all: [item.all === "true"],
        create: [item.create === "true"],
        read: [item.read === "true"],
        update: [item.update === "true"],
        delete: [item.delete === "true"],
        });

        // Debugging each value
        console.log(`Row ${index} values:`, group.value);

        this.formdetaillistArray.push(group);
      });

      // Debugging final form array values
      console.log('Final form array:', this.formdetaillistArray.value);
    },
    error: (e: any) => {
      console.error('Error fetching data:', e);
    },
  });
}

  viewUserrights(item: any):void{

  }
  
}
