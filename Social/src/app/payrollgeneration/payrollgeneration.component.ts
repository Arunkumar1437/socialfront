import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-payrollgeneration',
  templateUrl: './payrollgeneration.component.html',
  styleUrl: './payrollgeneration.component.css'
})
export class PayrollgenerationComponent  implements OnInit {
  payrollgenerationForm: FormGroup;
  leavedetail: any[] = [];
  salaryfixationList: any[] = [];
  pageddata: any[] = [];
  filteredData: any[] = [];
  userRightsview: any[] = [];
  userList: any[] = [];
  isView: boolean = false;
  noOfDays: number = 0;
  userid: any;
  username: any;
  description:any;

  @Input() totalItems: number = 0;
  @Input() itemsByPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  numPages: number = 1;
  searchTerm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.payrollgenerationForm = this.formBuilder.group({
      empid:['',Validators.required],
      month:['',Validators.required],
      year:['',Validators.required]
    });
  }
months = [
  { name: 'JAN', value: '01' },
  { name: 'FEB', value: '02' },
  { name: 'MAR', value: '03' },
  { name: 'APR', value: '04' },
  { name: 'MAY', value: '05' },
  { name: 'JUN', value: '06' },
  { name: 'JUL', value: '07' },
  { name: 'AUG', value: '08' },
  { name: 'SEP', value: '09' },
  { name: 'OCT', value: '10' },
  { name: 'NOV', value: '11' },
  { name: 'DEC', value: '12' }
];

years: number[] = [];

  ngOnInit(): void {
    this.userid = localStorage.getItem('UserId');
    this.username=localStorage.getItem('username');
      const userlistlocal = localStorage.getItem('userlist');

    if (userlistlocal) {
      this.userList = JSON.parse(userlistlocal); 
    } else {
      this.userList = [];  
    }
    if(this.userid!=""){
      this.payrollgenerationForm.get('userid')?.setValue(this.userid);
      this.payrollgenerationForm.get('empid')?.setValue(this.userid);
      this.payrollgenerationForm.get('empname')?.setValue(this.username);
      console.log('Login user Id:', this.userid);
      console.log('Login user Name:', this.username);
    }
     
    const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    this.years.push(i);
  }
   }
  onSubmit(): void {
    if (this.payrollgenerationForm.valid) {
      this.payrollgenerationForm.get('userid')?.setValue(this.userid);
      this.commonService.generatepayroll(this.payrollgenerationForm.value).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            const message = 'Generated successfully';
            this._snackBar.open(message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }else{
            if(res.message ===''){
            this._snackBar.open('Unable to save', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }else{
            const message1 = res.message;
            this._snackBar.open(message1, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }
          }
        },
        error: () => {
          this._snackBar.open('An error occurred while saving', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
  
}
