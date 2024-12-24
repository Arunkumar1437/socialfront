import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  dataForm: FormGroup;
  id: any;
  tutorials: any[] = [];
  isEdit: boolean = false;

  constructor(
    private dataService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private app: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.isEdit = !!this.id;
      this.loadData();
    });
  }

  loadData() {
    if (this.isEdit) {
      this.app.edit(this.id).subscribe({
        next: (data: any) => {
          this.tutorials = data.editlist;

          if (this.tutorials.length > 0) {
            const firstItem = this.tutorials[0];

            this.dataForm.patchValue({
              'name': firstItem.name,
              'email': firstItem.email,
              'age': firstItem.age,
              'dob': firstItem.dob,
              'gender': firstItem.gender,
            });
          } else {
            console.error('No data found for ID: ', this.id);
          }
        },
        error: (e: any) => {
          console.error('Error loading data:', e);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      this.dataService.saveData(this.dataForm.value).subscribe(
        res => {
          if (res.sucess==true) {
          this.router.navigate(['/mainpage/main']);
          this._snackBar.open('Data Saved successfully', '', {
            duration: 300,horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
        if(res.emailerror==true){
          this._snackBar.open('Email Already Exit', '', {
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
  Update(): void {
    if (this.dataForm.valid) {
      this.app.updateData(this.dataForm.value,this.id).subscribe(
        res => {
          if (res.sucess==true) {
          this.router.navigate(['/mainpage/main']);
          this._snackBar.open('Data updated successfully', '', {
            duration: 300, horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
        if(res.emailerror==true){
          this.router.navigate(['/mainpage/main']);
          this._snackBar.open('Email Already Exit', '', {
            duration: 300, horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
        },
        error => {
          console.error('Error updating data:', error);
        }
      );
    }
  }
  cancel() {
    this.router.navigate(['/Login/login']);
  }
}
