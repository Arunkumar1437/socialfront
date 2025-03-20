import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Notification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  userid:string;
  command:string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isnotificationAdd:boolean=false;
  iscommendAdd:boolean=false;
  notifications: Notification[] = [];
  command:any[]=[];
  message:string='';
  userid: any;
  notificationForm: FormGroup; 
  commandForm: FormGroup; 
  constructor(private commonService: CommonService,private fb: FormBuilder) {
    const luserid = localStorage.getItem('userid');
    this.userid = luserid;

    this.notificationForm = this.fb.group({
      message: ['', Validators.required] 
    });
    this.commandForm = this.fb.group({
      command: ['', Validators.required] 
    });
  }
  
  ngOnInit() {
    this.loadNotifications();
    this.loadCommands();
  }

  loadNotifications() {
        this.commonService.getUnreadNotifications().subscribe({
          next: (data: any) => {
        this.notifications = data.unreadnotification || [];
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }

  markAsRead(id: number) {
    this.commonService.markAsRead(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.loadNotifications();
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }

  addNotification() {
    if (this.notificationForm.valid) {
      const newNotification = { 
        message: this.notificationForm.value.message, 
        type: "info" 
      };
      this.commonService.createNotification(newNotification).subscribe(() => {
        this.isnotificationAdd = false;
        this.iscommendAdd = false;
        this.loadNotifications();
        this.notificationForm.reset(); 
      });
    } 
  }
  openaddnotificationentry(){this.isnotificationAdd=true;}
  closenotificationaddentry(){this.isnotificationAdd=false;}
  openaddcommandentry(){this.iscommendAdd=true;}
  closecommandentry(){this.iscommendAdd=false;}
  addCommand() {
    if (this.commandForm.valid) {
      const newCommand = { 
        command: this.commandForm.value.command, 
        userid: this.userid
      };

      this.commonService.createCommand(newCommand).subscribe(() => {
        this.isnotificationAdd = false;
        this.iscommendAdd = false;
        this.loadCommands();
        this.notificationForm.reset(); 
      });
    } 
  }

  loadCommands() {
    this.commonService.loadCommands().subscribe({
      next: (data: any) => {
    this.command = data.unreadcommand || [];
  },
   error: (error) => {console.error('Error fetching notifications:', error); }
   });
  }

  commamndmarkAsRead(id: number) {
    this.commonService.commandmarkAsRead(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.loadCommands();
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }
}
