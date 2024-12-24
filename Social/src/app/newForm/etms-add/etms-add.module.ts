import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtmsAddRoutingModule } from './etms-add-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EtmsAddComponent } from './etms-add.component';
import { CommonService } from 'src/app/common.service';
import { AddEmpComponent } from './add-emp/add-emp.component';


@NgModule({
  declarations: [EtmsAddComponent, AddEmpComponent],

  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EtmsAddRoutingModule
  ],providers: [CommonService],
})
export class EtmsAddModule { }
