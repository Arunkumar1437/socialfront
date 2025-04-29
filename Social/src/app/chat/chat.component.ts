import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service'; // Ensure this service is implemented correctly
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
  showEmojiPicker: boolean = false;
  selectedEmoji: any;
  receiverame!: string;
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
    const luserid = localStorage.getItem('UserId');
    if (luserid) {
      this.senderId = luserid;
    } else {
      this._snackBar.open('Sender ID not found!', 'Close', { duration: 3000 });
      return;
    }

    const receiverId = localStorage.getItem('receiverId');
    if (receiverId) {
      this.receiverId = receiverId;
    } else if (receiverId == null) {
      this.receiverId = ''; 
    } else {
      this._snackBar.open('Receiver ID not found!', 'Close', { duration: 3000 });
      return;
    }

    this.loadpersonList();
    this.loadChatHistory();
    this.loadbyId(this.receiverId,this.receiverame)
  }
  
  loadChatHistory() {
    const message = {
      senderId: this.senderId,
      receiverId: this.receiverId,
    };
    this.chatService.getChatHistory(message).subscribe(
      (response: any) => {
        this.chatHistory = response.chatHistory; 
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
        (response: any) => {
          
          this.chatForm.reset();  
          this.loadbyId(this.receiverId,this.receiverame);  
        }
      );
    }
  }

  // Fetch the list of available persons
  loadpersonList() {
    this.chatService.getChatperson().subscribe(
      (response: any) => {
        this.getperson = response.getperson; 
      }
    );
  }

  loadbyId(personId: string,personname:string) {
    const message = {
      senderId: this.senderId,
      receiverId: personId,
    };
    this.receiverId = personId;
    this.receiverame=personname;
    this.chatService.getChatHistorybyId(message).subscribe(
      (response: any) => {
        this.chatHistory = response.chatHistoryById; 
        const receiverId = localStorage.getItem('personId');
        console.log('receiverId :', receiverId);
      },
    );
    console.log(`Loading chat history for person with ID: ${personId}`);
  }

  /* Emoj */
  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any): void {
    const currentMessage = this.chatForm.get('newMessage')?.value || '';
    this.chatForm.patchValue({ newMessage: currentMessage + event.detail.emoji });
    this.showEmojiPicker = false; // Close emoji picker after selection
  }

  onEmojiSelect(event: any): void {
    this.selectedEmoji = event.emoji.native; // Capture the selected emoji
    const currentMessage = this.chatForm.get('newMessage')?.value || '';
    this.chatForm.patchValue({ newMessage: currentMessage + this.selectedEmoji }); // Append emoji to message
    this.showEmojiPicker = false; // Close emoji picker after emoji selection
    console.log('Selected Emoji:', this.selectedEmoji);
  }
}
