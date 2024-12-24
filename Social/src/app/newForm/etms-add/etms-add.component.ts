import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-etms-add',
  templateUrl: './etms-add.component.html',
  styleUrls: ['./etms-add.component.css']
})
export class EtmsAddComponent {
users: any;
items: any[]=[] ;

  constructor(
    private router: Router,
    private app: CommonService,
    private _snackBar: MatSnackBar
     ) {}
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    //
  }

  deleteUser(userId: number) {
    this.app.deleteData(userId).subscribe(
      () => {
        console.log('Data deleted successfully.');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/mainpage/main']);
            this._snackBar.open('Data deleted successfully', '', {
              duration: 300, horizontalPosition: 'end',
              verticalPosition: 'top',panelClass: ['custom-snackbar']
            });
        });
      },
      (error: any) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  openAddUserModal() {this.router.navigate(['/Addemp/addemp/0']);}
  editUser(user: any) {
  }
  getdmindata() {
    this.app.admindata().subscribe({
      next: (data: any) => {
        this.items = data.adminlist;
        console.log(this.items);
      },
      error: (e: any) => console.error(e)
      });
  }
  getempdata() {
    this.app.getempdata().subscribe({
      next: (data: any) => {
        this.items = data.emplistdata;
        console.log(this.items);
      },
      error: (e: any) => console.error(e)
      });
  }
}
