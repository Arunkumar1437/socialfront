import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmpRoutingModule } from './add-emp-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AddEmpComponent } from './add-emp.component';
import { CommonService } from 'src/app/common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEmpRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [AddEmpComponent,CommonService],

})
export class AddEmpModule { }
