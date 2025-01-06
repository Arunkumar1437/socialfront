import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetpasswordRoutingModule } from './forgetpassword-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { ForgetpasswordComponent } from './forgetpassword.component';


@NgModule({
    declarations: [],
      imports: [
        CommonModule,
        ForgetpasswordRoutingModule,
        HttpClientModule,ReactiveFormsModule,
      ],
      providers: [ForgetpasswordComponent,CommonService],
})
export class ForgetpasswordModule { }
