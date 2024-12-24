import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrintRoutingModule,
    HttpClientModule,
  ],
  providers: [CommonService],
})
export class PrintModule {}
