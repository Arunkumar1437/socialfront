import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] // Correctly use 'styleUrls' for an array
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: string[] = [];
  chatForm: FormGroup; 
  constructor(
    private chatService: CommonService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,) {
    this.chatForm = this.formBuilder.group({
      message: [],
      });
  }

  ngOnInit(): void {
    this.chatService.receiveMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.chatForm.valid) {
      if(this.chatForm.value !='' || this.chatForm.value!=null || this.chatForm.value !=undefined){
      this.chatService.sendMessage(this.chatForm.value);
      this.messages.push(this.chatForm.value.message);
      this.message = '';
     }
    }
  }

  receiveMessages():void{
    //this.chatService.receiveMessages().subscribe((message:String) => {
    // this.messages.push(message);
    //});
  }
}
