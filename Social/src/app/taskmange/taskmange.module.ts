import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskmangeRoutingModule } from './taskmange-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    TaskmangeRoutingModule
  ],providers: [CommonService],
})
export class TaskmangeModule { }

