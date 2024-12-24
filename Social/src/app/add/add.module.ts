import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './add.component';
import { AddRoutingModule } from './add--routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';

@NgModule({
    declarations: [AddComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AddRoutingModule,
        MatSnackBarModule,
  ],
  providers: [AddComponent,CommonService], // Ensure your service is provided here
})
export class AddModule { }
