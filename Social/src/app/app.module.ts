import { NgModule, importProvidersFrom } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskmangeComponent } from './taskmange/taskmange.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonService } from "./common.service";
import { MessageComponent } from './message/message.component';
import { PostComponent } from './post/post.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingComponent } from './setting/setting.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfileComponent } from "./profile/profile.component";
import { AuthInterceptor } from "./auth.interceptor";
import { OcrComponent } from './ocr/ocr.component';
import { ChatComponent } from './chat/chat.component';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { RouterModule } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormComponent } from './form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from "@angular/material/core";
import { MatCardModule } from '@angular/material/card';
import { MainpageComponent } from "./mainpage/mainpage.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeModule } from "./employee/employee.module";
import { HolidayComponent } from './holiday/holiday.component';

@NgModule({
  declarations: [
    TaskmangeComponent,
    AttendanceComponent,
    SidebarComponent,
     MessageComponent, 
     PostComponent,
      NotificationComponent,
       SettingComponent,
        RegisterComponent, 
        ForgetpasswordComponent,
         DashboardComponent,
          ProfileComponent,
          OcrComponent,
          ChatComponent,
          AdminComponent,
          FormComponent,MainpageComponent, EmployeeComponent, HolidayComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, NgChartsModule,PickerModule,RouterModule,NgSelectModule,FormsModule,MatCardModule,
    NgSelectModule, MatFormFieldModule, MatIconModule,
    MatIconModule,MatOptionModule,

  ], providers: [CommonService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
  ],
  exports: [
    SidebarComponent,MainpageComponent
  ],
})
export class AppModule { }
