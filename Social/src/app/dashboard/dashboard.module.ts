import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [],
  imports: [
     HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    DashboardRoutingModule,
    NgChartsModule 
  ],
  providers: [CommonService],
})
export class DashboardModule { }
