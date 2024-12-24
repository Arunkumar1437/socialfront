import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.loginService.login(username, password).subscribe(
        (response: any) => {
         if(response.logged==true){
            console.log('Login successful:', response);
            this._snackBar.open('Login successfully', '', {
              duration: 300,
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
            const token = response.token;
            localStorage.setItem('authToken', token); 
            console.log('authToken:', token);
            this.router.navigate(['/dashboard/dash']);
         }
         else{
          if (response.passerror==true) {
            this._snackBar.open(' InCorrect Password', '', {
              duration: 300,
              verticalPosition: 'top',
            });
          }
          if(response.usererror==true){
            this._snackBar.open('User Not Found', '', {
              duration: 300,
              verticalPosition: 'top',
            });
          }
          else{
           console.log('Login Failed :', response);
           this.errorMessage = 'Invalid credentials. Please try again.';
          }

         }

        },

      );
    }
  }
  register(){this.router.navigate(['/Register/register']);}
  openForgetPassword(): void {this.router.navigate(['/Forget/forget']);}
}
