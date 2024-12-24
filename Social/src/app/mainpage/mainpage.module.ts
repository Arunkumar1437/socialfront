import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageRoutingModule } from './mainpage-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainpageComponent } from './mainpage.component';
import { CommonService } from '../common.service';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [MainpageComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MainpageRoutingModule,NgChartsModule 
  ],
  providers: [CommonService],
})
export class MainpageModule { }
