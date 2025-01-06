import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [],
    imports: [
      CommonModule,
      RegisterRoutingModule,
      HttpClientModule,ReactiveFormsModule,
    ],
    providers: [RegisterComponent,CommonService],
})
export class RegisterModule { }
