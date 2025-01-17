import { ChangeDetectorRef, Component } from '@angular/core';
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
        label: 'Chats per Week',
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
          text: 'Days of the Week',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Entries',
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
    this.fetchLoginData();
    this.fetchLastLoginList();
    this.fetchChatData();
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
        if (data.list) {
          this.lastloginlist = data.list;
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
                label: 'Chats per Week',
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
}
