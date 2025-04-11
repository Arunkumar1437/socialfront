import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tutorials: any;
  message: any;
  items: any[] = [];
  selectedFile: File | undefined;
  lastloginlist: any[] = [];
  detailslog: any;
  header: string[] = [];
  details: number[] = [];
  chatheader: string[] = [];
  chatdetails: number[] = [];
  chatcolor: string[] = [];
  taskheader: string[] = [];
  taskdtails: number[] = [];
  taskcolor: string[] = [];
  attendanceheader: string[] = [];
  attendancedtails: number[] = [];
  attendancecolor: string[] = [];
  pageloginlist: any[] = [];
  luser:any;
  ishrms:boolean=false;
  isLogin:boolean=false;
  iscomunication:boolean=false;
   @Input() totalItems: number = 0;  
    @Input() itemsByPage: number = 5;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();  
    numPages: number = 1;
    selectedTab: string = ''; 

  loginData: ChartData<'line'> = {
    labels: this.header,
    datasets: [
      {
        data: this.details,
        label: 'Logins per Day',
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  chatData: ChartData<'bar'> = {
    labels: this.chatheader,
    datasets: [
      {
        data: this.chatdetails,
        label: 'Chat of Yesterday VS Today',
        backgroundColor: this.chatcolor, 
        borderColor: this.chatcolor, 
        borderWidth: 1, 
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Counts',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  attendanceData: ChartData<'bar'> = {
    labels: this.attendanceheader,
    datasets: [
      {
        data: this.attendancedtails,
        label: 'Attendance of a week',
        backgroundColor: this.attendancecolor, 
        borderColor: this.attendancecolor, 
        borderWidth: 1, 
      },
    ],
  };

  attendanceOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Counts',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  taskData: ChartData<'pie'> = {
    labels: this.taskheader,
    datasets: [
      {
        data: this.taskdtails,
        label: 'Task  of a Week',
        backgroundColor: this.taskcolor, 
        borderColor: this.taskcolor, 
        borderWidth: 1, 
      },
    ],
  };

  taskOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Counts',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  constructor(
    private router: Router,
    private app: CommonService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const mode = localStorage.getItem('mode');
    const luserid = localStorage.getItem('UserId');
    this.luser = luserid;
    this.ishrms = this.luser === 'N001';
    this.isLogin = this.luser === 'N001';
    this.iscomunication = this.luser === 'N001' ||this.luser === 'E0001';
    if(this.luser === 'N001' ||this.luser === 'E0001'){
      this.selectedTab='login'

    }
    this.fetchLoginData();
    this.fetchLastLoginList();
    this.fetchChatData();
    this.fetchAttendanceData();
    this.fetchTaskData();
  }

  fetchLoginData(): void {
    this.app.getLoginData().subscribe({
      next: (data: any) => {
        if (data.logindetails) {
          const detailsArray = Array.isArray(data.logindetails)
            ? data.logindetails
            : Object.values(data.logindetails);

          this.header = detailsArray.map((item: { dayofweek: string }) => item.dayofweek);
          this.details = detailsArray.map((item: { loginCount: number }) => item.loginCount);

          this.loginData = {
            labels: this.header,
            datasets: [
              {
                data: this.details,
                label: 'Logins per Day',
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                tension: 0.4,
                fill: true,
              },
            ],
          };

          this.cdr.detectChanges();
        } else {
          console.error('Login details not available or invalid.');
        }
      },
      error: (e: any) => console.error('Error fetching login data:', e),
    });
  }

  fetchLastLoginList(): void {
    this.app.list().subscribe({
      next: (data: any) => {
        if (data.loginlist) {
          this.lastloginlist = data.loginlist;
          this.totalItems = this.lastloginlist.length;
          this.numPages = Math.ceil(this.totalItems / this.itemsByPage);  
          this.updatePagedData(); 
        } else {
          console.error('Last login list not available.');
        }
      },
      error: (e: any) => console.error('Error fetching last login list:', e),
    });
  }
  
  fetchChatData(): void {
    this.app.getChatData().subscribe({
      next: (data: any) => {
        if (data.getchatdata) {
          const chatDataArray = Array.isArray(data.getchatdata)
            ? data.getchatdata
            : Object.values(data.getchatdata);
  
          this.chatheader = chatDataArray.map((item: { dayofweek: string }) => item.dayofweek);
          this.chatdetails = chatDataArray.map((item: { chatcount: number }) => item.chatcount);
          this.chatcolor = chatDataArray.map((item: { dayofweek: string }) =>
            item.dayofweek === 'Yesterday' ? '#ff0000' : '#87ceeb'
          );

          this.chatData = {
            labels: this.chatheader,
            datasets: [
              {
                data: this.chatdetails,
                label: 'Chats of Yesterday and Today',
                backgroundColor: this.chatcolor,
                borderColor: this.chatcolor,
                borderWidth: 1, 
              },
            ],
          };
  
          this.cdr.detectChanges();
        } else {
          console.error('Chat data not available or invalid.');
        }
      },
      error: (e: any) => console.error('Error fetching chat data:', e),
    });
  }

  // <----pagenation start here ---->
  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsByPage;
    const endIndex = startIndex + this.itemsByPage;
    this.pageloginlist = this.lastloginlist.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagedData();
    this.pageChanged.emit(newPage);  
  }

  updatePagination() {
    this.numPages = Math.ceil(this.totalItems / this.itemsByPage);
    if (this.currentPage > this.numPages) {
      this.currentPage = this.numPages;
    }
    this.pageChanged.emit(this.currentPage);
  }

  selectPage(page: number) {
    if (page < 1 || page > this.numPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagedData();
  }

  onPageNumberChange() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.numPages) {
      this.currentPage = this.numPages;
    }
  }
  //<---- pagenation end  here ---->

  onchangemode(mode: string ){
    if(mode==='dark'){
        
    }else if(mode==='light'){
      
    }else{

    }
  }

  fetchAttendanceData(): void {
    this.app.getattendancedata().subscribe({
      next: (data: any) => {
        if (data.getattendancedata) {
          const chatDataArray = Array.isArray(data.getattendancedata)
            ? data.getattendancedata
            : Object.values(data.getattendancedata);
          this.attendanceheader = chatDataArray.map((item: { dayofweek: string }) => item.dayofweek);
          this.attendancedtails = chatDataArray.map((item: { attendancecount: number }) => item.attendancecount);
          this.attendancecolor = chatDataArray.map((item: { dayofweek: string }) => {
            switch (item.dayofweek) {
              case 'Monday':
                return '#0000ff'; 
              case 'Tuesday':
                return '#ffa500'; 
              case 'Wednesday':
                return '#808080'; 
              case 'Thursday':
                return '#ff69b4'; 
              case 'Friday':
                return '#ffff00'; 
              case 'Saturday':
                return '#008000'; 
              default:
                return '#87ceeb'; 
            }
          });
          this.attendanceData = {
            labels: this.attendanceheader,
            datasets: [
              {
                data: this.attendancedtails,
                label: 'Attendance of a Week',
                backgroundColor: this.attendancecolor,
                borderColor: this.attendancecolor,
                borderWidth: 1, 
              },
            ],
          };
          this.cdr.detectChanges();
        } else {
          console.error('Attendance data not available or invalid.');
        }
      },
      error: (e: any) => console.error('Error fetching Attendance data:', e),
    });
  }

  fetchTaskData(): void {
    this.app.gettaskdata().subscribe({
      next: (data: any) => {
        if (data.gettaskdata) {
          const chatDataArray = Array.isArray(data.gettaskdata)
            ? data.gettaskdata
            : Object.values(data.gettaskdata);
          this.taskheader = chatDataArray.map((item: { dayofweek: string }) => item.dayofweek);
          this.taskdtails = chatDataArray.map((item: { taskcount: number }) => item.taskcount);
          this.taskcolor = chatDataArray.map((item: { dayofweek: string }) => {
            switch (item.dayofweek) {
              case 'Monday':
                return '#87ceeb'; // SkyBlue
            case 'Tuesday':
                return '#008000'; // Green
            case 'Wednesday':
                return '#ff69b4'; // HotPink
            case 'Thursday':
                return '#ffff00'; // Yellow
            case 'Friday':
                return '#808080'; // Grey (instead of white)
            case 'Saturday':
                return '#ffa500'; // Orange
            default:
                return '#0000ff'; // Blue
            }
          });
          this.taskData = {
            labels: this.taskheader,
            datasets: [
              {
                data: this.taskdtails,
                label: 'Task of a Week',
                backgroundColor: this.taskcolor,
                borderColor: this.taskcolor,
                borderWidth: 1, 
              },
            ],
          };
          this.cdr.detectChanges();
        } else {
          console.error('Task data not available or invalid.');
        }
      },
      error: (e: any) => console.error('Error fetching Task data:', e),
    });
  }
}
