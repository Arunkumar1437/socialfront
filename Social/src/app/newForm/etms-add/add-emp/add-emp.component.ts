import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent {
  [x: string]: any;
  employee: any = {};
  EmpForm: FormGroup;

  constructor(

    private dataService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private app: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.EmpForm = this.formBuilder.group({
      fname: ['', Validators.required],
      userid: ['', Validators.required],
      password: ['', Validators.required],
      desc: ['', Validators.required],
      empemail: ['', [Validators.required, Validators.email]],
    });
  }

  cancel() {this.router.navigate(['/EtmsAdd/etmsadd']);}

  addEmployee() {
    if (this.EmpForm.valid) {
      this.dataService.saveData(this.EmpForm.value).subscribe(
        res => {
          if (res.sucess==true) {
          this.router.navigate(['/mainpage/main']);
          this._snackBar.open('Data Saved successfully', '', {
            duration: 300,horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
        if(res.emailerror==true){
          this._snackBar.open('Email/UserID Already Exit', '', {
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
  closeModal() {
    console.log('Closing modal');
  }
}
