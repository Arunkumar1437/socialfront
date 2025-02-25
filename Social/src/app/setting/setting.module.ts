import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../common.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,NgSelectModule,
      ] ,
      providers: [CommonService],
})
export class SettingModule { }
