import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-taskmange',
  templateUrl: './taskmange.component.html',
  styleUrls: ['./taskmange.component.css']
})
export class TaskmangeComponent {
  constructor(
    private router: Router,
    private app: CommonService,
    private _snackBar: MatSnackBar
     ) {}
detailtask(_t20: any) {
throw new Error('Method not implemented.');
}
deletetask(arg0: any) {
throw new Error('Method not implemented.');
}
edittask(_t19: any) {
throw new Error('Method not implemented.');
}
users: any;
AssignTask() {this.router.navigate(['/Assigntask/assigntask/0'])}

}
