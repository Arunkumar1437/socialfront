import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeavetypeRoutingModule } from './leavetype-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LeavetypeRoutingModule,
    MatSnackBarModule,NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
   providers: [CommonService],
})
export class LeavetypeModule { }
