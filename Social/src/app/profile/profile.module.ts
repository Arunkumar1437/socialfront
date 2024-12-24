import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpClientModule,ReactiveFormsModule,
  ],
  providers: [ProfileComponent,CommonService],
})
export class ProfileModule { }
