import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddComponent } from '../add/add.component';
import { CommonService } from '../common.service';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
        ReactiveFormsModule, MatInputModule, MatSelectModule, MatCardModule,MatFormFieldModule,
        MatSnackBarModule,NgSelectModule, 
    CommonModule,
    AdminRoutingModule
  ],      providers: [AddComponent,CommonService],
  
})
export class AdminModule { }
