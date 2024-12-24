import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  emailForm: FormGroup;
  userEmail = 'arunkumar@paragondynamics.in';
  
  constructor(private dataService: CommonService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,) {
    this.emailForm = this.formBuilder.group({
      from:[,Validators.required, Validators.email],
      to: [,Validators.required, Validators.email],
      cc: [,Validators.email],
      bcc: [,Validators.email],
      subject: [,],
      message: [,Validators.required],
      attachment: []
    });
    
  }
  ngOnInit(): void {
    this.emailForm.patchValue({
      from:this.userEmail,
    });
  }
  onSend() {
    if (this.emailForm.valid) {
      console.log('Email data:', this.emailForm.value);
      alert('Email Sent!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}