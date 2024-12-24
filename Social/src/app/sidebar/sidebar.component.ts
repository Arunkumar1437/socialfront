import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  adminvalidation:boolean=false;
  route: any;
  LuserId: any;
 username: any;
 isCollapsed:boolean=false;
  currentDate: string | undefined;
  currentTime: string | undefined;

   constructor(private router: Router,    private app: CommonService,
   ) {}
   ngOnInit(): void {
    this.getLastUser();
    this.updateDateTime();
  }

  getLastUser(): void {
    this.app.getLastUser().subscribe(
      (data: any) => {
        this.LuserId = data.luserid;
        this.username = data.username;
        console.log(this.LuserId);
        if( this.LuserId==='N001'){
           this.adminvalidation=true;
        }else{
          this.adminvalidation=false;
        }
        const luserid = data.luserid;
            localStorage.setItem('userid', luserid); 
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

    }, 1000); // Update every second
  }
  
  ocr(){this.router.navigate(['/ocr/ocr']);}
  chat(){this.router.navigate(['/chat/chat'])}
}
