import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegForm: FormGroup;
  showPassword = false;
  showPassword1 = false;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dataService: CommonService,
  ) {
    this.RegForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      age: [null, [Validators.min(1), Validators.max(100)]],
      emailid: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showPassword1 = !this.showPassword1;
    }
  }

  newReg() {
    if (this.RegForm.valid) {
      const formData = this.RegForm.value;
      if(this.RegForm.value.password===this.RegForm.value.confirmPassword){
      this.dataService.newReg(formData).subscribe(
        (res: any) => {
          if (res.sucess) {
            this._snackBar.open('Registered successfully!', '', {duration: 300,
              verticalPosition: 'top',horizontalPosition: 'right',
              panelClass: ['success-snackbar'] });
              this.router.navigate(['/Login/login'], {
                queryParams: { userid: res.userid, password: res.password },
              });
          } else if (res.emailError) {
            this._snackBar.open('Email ID already exists.', '', { duration: 300,
              verticalPosition: 'top',horizontalPosition: 'right',
              panelClass: ['success-snackbar'] });
          }
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      this._snackBar.open('Password and Conform Password must be same.', '', { duration: 300,
        verticalPosition: 'top',horizontalPosition: 'right',
        panelClass: ['success-snackbar'] });
    }
    (document.getElementById('confirmPassword') as HTMLInputElement).value = '';
    (document.getElementById('Password') as HTMLInputElement).value = '';

  }else {
    this._snackBar.open('Please fill all required fields correctly.', '', { duration: 300,
      verticalPosition: 'top',horizontalPosition: 'right',
      panelClass: ['success-snackbar'] });
  }

  }
  cancel() {
    this.router.navigate(['/Login/login']);
  }
}
