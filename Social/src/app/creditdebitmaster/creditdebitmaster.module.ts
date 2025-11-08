import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditdebitmasterRoutingModule } from './creditdebitmaster-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreditdebitmasterRoutingModule,
    MatSnackBarModule,NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
     providers: [CommonService],
 })
export class CreditdebitmasterModule { }
