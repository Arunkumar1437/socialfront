import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const userid = params['userid'];
      const password = params['password'];
  
      if (userid && password) {
        this.loginForm.patchValue({
          userid: userid,
          password: password,
        });
      }
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      const userid = this.loginForm.get('userid')?.value;
      const password = this.loginForm.get('password')?.value;

      this.loginService.login(userid, password).subscribe(
        (response: any) => {
         if(response.logged==true){
            console.log('Login successful:', response);
            this._snackBar.open('Login successfully', '', {
              duration: 300,
              verticalPosition: 'top',horizontalPosition: 'right',
              panelClass: ['success-snackbar']
              
            });
            const loginid = response.userid;
            localStorage.setItem('UserId', loginid); 
            console.log('UserId:', loginid);
            const token = response.token;
            localStorage.setItem('authToken', token); 
            console.log('authToken:', token);
            this.router.navigate(['/dashboard/dash']);
         }
         else{
          if (response.passerror==true) {
            this._snackBar.open(' InCorrect Password', '', {
              duration: 300,
              verticalPosition: 'top',horizontalPosition: 'right',
            });
          }
          if(response.usererror==true){
            this._snackBar.open('User Not Found', '', {
              duration: 300,
              verticalPosition: 'top',horizontalPosition: 'right',
            });
          }
          else{
           console.log('Login Failed :', response);
           this.errorMessage = 'Invalid credentials. Please try again.';
           this._snackBar.open('Invalid credentials. Please try again.', '', {
            duration: 300,
            verticalPosition: 'top',horizontalPosition: 'right',
          });
          }

         }

        },

      );
    }
  }
  register(){this.router.navigate(['/Register/register']);}
  openForgetPassword(): void {this.router.navigate(['/Forget/forget']);}
 
}
