import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../common.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    HttpClientModule,
  ],
  providers: [CommonService],

})
export class SidebarModule { }
