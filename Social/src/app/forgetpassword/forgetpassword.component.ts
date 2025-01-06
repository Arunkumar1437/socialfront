import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgotForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService, 
    private _snackBar: MatSnackBar
  ) {
    // Initialize the form group with validation rules
    this.forgotForm = this.formBuilder.group({
      username: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  changepass() {
    if (this.forgotForm.valid) {
      const { username, newPassword, confirmPassword } = this.forgotForm.value;
      if (newPassword !== confirmPassword) {
        this._snackBar.open('Password and Confirm Password must be same.', '', {
          duration: 300,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });
        return;
      }
      const formData = this.forgotForm.value;
      this.commonService.changepass(formData).subscribe(
        (res: any) => {
          if (res.sucess) {
            this._snackBar.open('Password changed successfully!', '', {
              duration: 300,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/Login/login']);  
          } else {
            if(res.usererror==true){
              this._snackBar.open('User Not Found', '', {
                duration: 300,
                verticalPosition: 'top',horizontalPosition: 'right',
              });
            }else{
            this._snackBar.open(res.message || 'Something went wrong!', '', {
              duration: 300,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['error-snackbar']
            });
          }
        }
        },
        (error: any) => {
          console.error('Error changing password:', error);
          this._snackBar.open('Error changing password. Please try again later.', '', {
            duration: 300,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      this._snackBar.open('Please fill in all fields correctly.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
    }
  }
  cancel() {
    this.router.navigate(['/Login/login']);
  }
}
