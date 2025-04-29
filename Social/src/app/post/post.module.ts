import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostRoutingModule, HttpClientModule,ReactiveFormsModule,
  ],
    providers: [CommonService],
})
export class PostModule { }
