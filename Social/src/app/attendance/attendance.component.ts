import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  attendances: any[] | undefined;
  clockedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private router: Router, private app: CommonService, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {
      // Fetch attendance records
      this.fetchAttendances();
      // Check user role (assuming isAdmin property is set based on user role)
      this.isAdmin = true; // Set it based on user role
    }

    fetchAttendances() {
      // Fetch attendance records from backend API
      //this.http.get<any[]>('http://localhost:8080/attendance')
        //.subscribe(attendances => {
         // this.attendances = attendances;
          // Check if the user is currently clocked in
         /// this.clockedIn = this.attendances.some(a => !a.outTime);
       /// });
    }

    clockIn() {
      // Send request to clock in
     /// this.http.post<any>('http://localhost:8080/attendance/clockIn?userId=123', {})
       // .subscribe(response => {
          // Refresh attendance records after clock in
          this.fetchAttendances();
       // });
    }

    clockOut(attendanceId: number) {
      // Send request to clock out
     /// this.http.post<any>('http://localhost:8080/attendance/clockOut?attendanceId=' + attendanceId, {})
      //  .subscribe(response => {
          // Refresh attendance records after clock out
          this.fetchAttendances();
        //});
    }

    deleteAttendance(attendanceId: number) {
      // Send request to delete attendance
      //this.http.delete('http://localhost:8080/attendance/' + attendanceId)
       // .subscribe(response => {
          // Refresh attendance records after deletion
          this.fetchAttendances();
       // });
    }
}
