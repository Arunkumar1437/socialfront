import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], 
})
export class ProfileComponent {
  employee: any = {}; 
  EmpForm: FormGroup; 
  isViewOnly = true; 
  router: any;
  userid:any;
  tutorials: any[] = [];
  isEdit: boolean = false;
  showPassword: boolean = false;

  constructor(
    private dataService: CommonService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.EmpForm = this.formBuilder.group({
      name: [Validators.required],
      age: [Validators.required],
      password: [Validators.required],
      dob: [Validators.required],
      gender: [Validators.required],
      email:[Validators.required, Validators.email],
      userid:[],
      desc:[],
    });

    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: string | number; }) => {
      this.userid = params['id'];
      this.loadData();
    });
  }
  
  toggleEdit() {
    this.isEdit = true;
    this.isViewOnly=false;
      this.loadData();
  }

  // Update employee profile
  updateProfile() {
    if (this.EmpForm.valid) {
    this.dataService.updateData(this.EmpForm.value,this.userid).subscribe(
      
      res => {
        console.log(res);
        if (res.sucess==true) {
          this.isEdit = false;
          this.isViewOnly=true;
            this.loadData();
        this._snackBar.open('Updated successfully', '', {
          duration: 300,horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
      if(res.emailerror==true){
        this._snackBar.open('EmailID Already Exit', '', {
          duration: 300, horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
      },
      error => {
        console.error('Error saving data:', error);
      }
    );
  }
}
cancel() {
  this.isEdit = false;
    this.isViewOnly=true;
      this.loadData();
}

loadData() {
  if (!this.isEdit && this.isViewOnly) {
    this.dataService.view(this.userid).subscribe({
      next: (data: any) => {
        this.tutorials = data.editlist;
        if (this.tutorials.length > 0) {
          const firstItem = this.tutorials[0];

          this.EmpForm.patchValue({
            name: firstItem.username,
            userid: firstItem.userid,
            password: firstItem.password,
            desc: firstItem.desc,
            email: firstItem.email,
            age:firstItem.age,
            dob:firstItem.dob,
            gender:firstItem.gender,
          });
        } else {
          console.error('No data found for ID: ', this.userid);
        }
      },
      error: (e: any) => {
        console.error('Error fetch data:', e);
      }
    });
  }else{
    this.dataService.view(this.userid).subscribe({
      next: (data: any) => {
        this.tutorials = data.editlist;
        if (this.tutorials.length > 0) {
          const firstItem = this.tutorials[0];

          this.EmpForm.patchValue({
            'name': firstItem.username,
            'email': firstItem.email,
            'age': firstItem.age,
            'dob': firstItem.dob,
            'gender': firstItem.gender,
            });
        } else {
          console.error('No data found for ID: ', this.userid);
        }
      },
      error: (e: any) => {
        console.error('Error fetch data:', e);
      }
    });
  }
}


togglePasswordVisibility(): void {
  this.showPassword = true;
}
togglePassworddisable(): void {
  this.showPassword = false;
}
}
