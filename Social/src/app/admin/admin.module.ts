import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddComponent } from '../add/add.component';
import { CommonService } from '../common.service';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule,NgSelectModule,
    CommonModule,
    AdminRoutingModule
  ],      providers: [AddComponent,CommonService],
  
})
export class AdminModule { }
