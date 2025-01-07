import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'], 
})
export class ChatComponent implements OnInit {
  chatHistory: any[] = [];
  getperson: any[] = [];
  senderId!: string;  
  receiverId!: string;  
  chatForm: FormGroup;

  constructor(
    private chatService: CommonService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.chatForm = this.formBuilder.group({
      newMessage: [''],
    });
  }

  ngOnInit() {
    const UserId = localStorage.getItem('UserId');
    if (UserId) {
      this.senderId = UserId;
    } else {
      this._snackBar.open('User ID not found!', 'Close', { duration: 3000 });
      return;
    }

    this.receiverId = 'E0001';
    this.loadpersonList();
    this.loadChatHistory();
  }

  loadChatHistory() {
    const message = {
      senderId: this.senderId,
      receiverId: this.receiverId,
    };
    this.chatService.getChatHistory(message).subscribe(
      (response: any) => {
        this.chatHistory = response.chatHistory; 
      },
      (error) => {
        this._snackBar.open('Failed to load chat history', 'Close', { duration: 3000 });
      }
    );
  }

  sendMessage() {
    if (this.chatForm.valid) {
      const message = {
        senderId: this.senderId,
        receiverId: this.receiverId,
        content: this.chatForm.get('newMessage')?.value,  
      };

      this.chatService.sendMessage(message).subscribe(
        () => {
          this.chatForm.reset();  
          this.loadChatHistory();  
        },
        (error) => {
          this._snackBar.open('Failed to send message', 'Close', { duration: 3000 });
        }
      );
    }
  }
  loadpersonList() {
    this.chatService.getChatperson().subscribe(
      (response: any) => {
        this.getperson = response.getperson; 
      },
      (error) => {
        this._snackBar.open('Failed to load chat history', 'Close', { duration: 3000 });
      }
    );
  }

}
