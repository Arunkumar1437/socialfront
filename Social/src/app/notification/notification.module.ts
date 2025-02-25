import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,NgSelectModule,
  ] ,
  providers: [CommonService],
})
export class NotificationModule { }
