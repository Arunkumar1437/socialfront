import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageRoutingModule } from './mainpage-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../common.service';





@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    MainpageRoutingModule
  ],
  providers: [CommonService],
})
export class MainpageModule { }
