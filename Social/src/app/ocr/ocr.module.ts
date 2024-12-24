import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcrRoutingModule } from './ocr-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { OcrComponent } from './ocr.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OcrRoutingModule,
    HttpClientModule,ReactiveFormsModule,
  ],
  providers: [OcrComponent,CommonService],
})
export class OcrModule { }
