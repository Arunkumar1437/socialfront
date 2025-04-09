import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';
import { ChartData, ChartOptions } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent{
  adminvalidation:boolean=false;
  route: any;
  LuserId: any;
  username: any;
  isCollapsed:boolean=false;
  currentDate: string | undefined;
  currentTime: string | undefined;
  forms: any; modules: any;
  currentDate1: Date = new Date();
  daysInMonth: number[] = [];
  month1: number ;
  year1!: number;
  hoveredModuleCode: string | null = null;
  isDarkMode = false;
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   constructor(private router: Router,    private app: CommonService) {
    this.month1 = this.currentDate1.getMonth();
    this.month1 = this.currentDate1.getFullYear();
    this.generateCalendar();
   }
   ngOnInit(): void {
    const luserid = localStorage.getItem('UserId');
    this.LuserId=luserid
    this.getLastUser(this.LuserId);
    this.updateDateTime();
    this.checkuserlog(this.LuserId);
   // this.checkcomment();
  }

  getLastUser(LuserId:any): void {
    this.app.getLastUser(LuserId).subscribe(
      (data: any) => {
        this.LuserId = LuserId;
        this.username = data.username;
        this.modules=data.modules;
        console.log(this.LuserId);
        if( this.LuserId==='N001'){
           this.adminvalidation=true;
        }else{
          this.adminvalidation=false;
        }
        const luserid = data.luserid;
        const lusername = data.username;
        const  userlist= data.userlist;

            localStorage.setItem('userid', LuserId); 
            localStorage.setItem('username', lusername); 
            localStorage.setItem('userlist', JSON.stringify(userlist)); 
          },
      (error: any) => {
        console.error('Error fetching last user:', error);
      }
    );
  }
  isSidebarClosed = false;

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.isCollapsed = !this.isCollapsed;
  }

   logout() {this.router.navigate(['/Login/login']);}
   newform(){this.router.navigate(['/EtmsAdd/etmsadd']);}
   task(){this.router.navigate(['/Taskmanage/taskmanage']);}
   attend() {this.router.navigate(['/Attend/attend']); }
   message() {this.router.navigate(['/message/message']); }
   dashboard(){this.router.navigate(['/dashboard/dash']); }
   post(){this.router.navigate(['/post/post']); }
   notification(){this.router.navigate(['/notification/notification']);}
   ChangePassword(){this.router.navigate(['/Forget/forget']);}
   setting(){this.router.navigate(['/Setting/setting']);}
   profile() {this.router.navigate([`/profile/profile/${this.LuserId}`]);}
   Admin(){this.router.navigate(['/Admin/admin']);}
  
  updateDateTime(): void {
    setInterval(() => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0'); 
      const month = String(now.getMonth() + 1).padStart(2, '0'); 
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); 
  
      this.currentDate = `${day}/${month}/${year} `;
      this.currentTime = `${hours}:${minutes}:${seconds}`;

    }, 1000); 
  }
  ocr(){this.router.navigate(['/ocr/ocr']);}
  chat(){this.router.navigate(['/chat/chat'])}
  generateCalendar(): void {
    const firstDay = new Date(this.year1, this.month1, 1).getDay();
    const totalDays = new Date(this.year1, this.month1 + 1, 0).getDate();
    this.daysInMonth = [];

    for (let i = 0; i < firstDay; i++) {
      this.daysInMonth.push(0);
    }

    for (let i = 1; i <= totalDays; i++) {
      this.daysInMonth.push(i);
    }
  }

  prevMonth(): void {
    if (this.month1 === 0) {
      this.month1 = 11;
      this.year1--;
    } else {
      this.month1--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.month1 === 11) {
      this.month1 = 0;
      this.year1++;
    } else {
      this.month1++;
    }
    this.generateCalendar();
  }

  selectDate(day: number): void {
    if (day > 0) {
      alert(`You selected ${this.year1}-${this.month1 + 1}-${day}`);
    }
  }

  checkcomment(): void { 
    const userid = localStorage.getItem('userid');
    this.app.getcheckcomment(userid).subscribe(
      (data: any) => {
        if (data.commend === 'open') {
        } else if (data.commend === 'close') {
          this.logout();
        }
      },
      (error: any) => {
        console.error('Error fetching last user:', error);
      }
    );
}

sendModuleCode(moduleCode: string) {
  this.hoveredModuleCode = moduleCode;
  
  const data = { 
    userid: this.LuserId, 
    modulecode: moduleCode 
  };
  this.app.getformlist(data).subscribe( (data: any) => {
    this.forms=data.formlist;
      console.log(this.forms);
    }, error => {
      console.error('Error sending module code:', error);
    });
}
clearModuleCode() {
  this.hoveredModuleCode = null;
}

checkuserlog(luser:any): void { 
    if(luser==='' || luser===null || luser===undefined){
      this.logout();
    }else{
      
    }
}
}
