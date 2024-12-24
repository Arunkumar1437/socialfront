import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HttpClientModule,ReactiveFormsModule,
  ],
  providers: [ChatComponent,CommonService],

})
export class ChatModule { }
