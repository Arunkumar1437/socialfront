import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { ChatComponent } from './chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HttpClientModule,ReactiveFormsModule,PickerModule
  ],
  providers: [ChatComponent,CommonService],
  
})
export class ChatModule { }
