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
  lastloginlist:any[]=[];

  detailslog: any;
  header: string[] = [];  
  details: number[] = []; 

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
          text: 'Number of Logins',  
        },
        beginAtZero: true, 
        ticks: {
          stepSize: 0.1,  
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
  }


  fetchLoginData(): void {
    this.app.getLoginData().subscribe({
      next: (data: any) => {
        console.log("API Response:", data);

        let detailsArray: any[] = [];

        if (data.logindetails && Array.isArray(data.logindetails)) {
          detailsArray = data.logindetails; 
        } else if (data.logindetails && typeof data.logindetails === 'object') {
          detailsArray = Object.values(data.logindetails); 
        }

        if (detailsArray.length > 0) {
          this.detailslog = detailsArray; 

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
          console.error("`logindetails` is not valid or empty");
        }
      },
      error: (e: any) => console.error("Error fetching data:", e)
    });
  }
  fetchLastLoginList(): void {
    this.app.list().subscribe({
      next: (data: any) => {
        console.log("API Response:", data);
        if (data.list) {
          this.lastloginlist=data.list;
        }
      },
      error: (e: any) => console.error("Error fetching data:", e)
    });
  }
}
