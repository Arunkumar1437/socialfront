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
          FormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, NgChartsModule,PickerModule,RouterModule,NgSelectModule,FormsModule

  ], providers: [CommonService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
  ],
  exports: [
    SidebarComponent,
  ],
})
export class AppModule { }
