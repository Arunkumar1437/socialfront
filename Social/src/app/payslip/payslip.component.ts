import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrl: './payslip.component.css'
})
export class PayslipComponent implements OnInit {
  payslipForm: FormGroup;
  userList: any[] = [];
  isView: boolean = false;
  noOfDays: number = 0;
  userid: any;
  username: any;

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
    this.payslipForm = this.formBuilder.group({
      empid:['',Validators.required],
      month:['',Validators.required],
      year:['',Validators.required],
      username:[''],
      lopdays:[''],
      netamountword:[''],
      email:[''],
      lopamount:[''],
      insentiveamount:[''],
      epfamount:[''],
      basicamount:[''],
      grosspay:[''],
      grossdeduct:[''],
      netpay:[''],
      monthword:[''],
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
      this.payslipForm.get('userid')?.setValue(this.userid);
      this.payslipForm.get('empid')?.setValue(this.userid);
      this.payslipForm.get('empname')?.setValue(this.username);
      console.log('Login user Id:', this.userid);
      console.log('Login user Name:', this.username);
    }
     
    const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    this.years.push(i);
  }
   }

  onSubmit(): void {
    if (this.payslipForm.valid) {
      this.payslipForm.get('userid')?.setValue(this.userid);
      this.commonService.getpayslipview(this.payslipForm.value).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            this.isView=true;
             this.payslipForm.patchValue({
            empid:res.empid,
            username:res.username,
            lopdays:res.lopdays,
            year:res.year,
            month:res.month,
            netamountword:res.netamountword,
            email:res.email,
            lopamount:res.lopamount,
            insentiveamount:res.insentiveamount,
            epfamount:res.epfamount,
            basicamount:res.basicamount,
            grosspay:res.grosspay,
            grossdeduct:res.grossdeduct,
            netpay:res.netpay,
            monthword:res.monthword,
            
        });
          }else{
            if(res.message ===''){
            this._snackBar.open('Unable to get the data', '', {
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
  sendMail():void{
     this.commonService.sendpayslipmail(this.payslipForm.value).subscribe({
        next: (res: any) => {
          if (res.sucess === true) {
            this._snackBar.open('Mail Send Successfully', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }else{
            if(res.message ===''){
            this._snackBar.open('Unable to get the data', '', {
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
        
      });
    }
    payslipprint():void{
 if (this.isView) {
    const printContents = document.getElementById('payslipSection')?.innerHTML;
    const popupWindow = window.open('', '_blank', 'width=800,height=600');
    popupWindow?.document.open();
    popupWindow?.document.write(`
      <html>
        <head>
          <title>Payslip</title>
          </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWindow?.document.close();
  } else {
    alert("Payslip view is not available to print.");
  }
}
}
