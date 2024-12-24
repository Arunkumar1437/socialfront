import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { MessageComponent } from './message.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessageRoutingModule,
    HttpClientModule,ReactiveFormsModule,
  ],
  providers: [MessageComponent,CommonService],
})
export class MessageModule { }
