import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { TaskmangeComponent } from './taskmange/taskmange.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MessageComponent } from './message/message.component';
import { PostComponent } from './post/post.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OcrComponent } from './ocr/ocr.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';
import { FormComponent } from './form/form.component';
import { EmployeeComponent } from './employee/employee.component';
import { HolidayComponent } from './holiday/holiday.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavedeclarationComponent } from './leavedeclaration/leavedeclaration.component';
import { LeaveapplicationComponent } from './leaveapplication/leaveapplication.component';
import { CurrencyComponent } from './currency/currency.component';
import { EmojComponent } from './emoj/emoj.component';

export const routes: Routes = [
    //configure the modules
    {path:"mainpage",loadChildren:()=>import("./mainpage/mainpage.module").then((m)=>m.MainpageModule)},
    {path:"Login",loadChildren:()=>import("./login/login.module").then((m)=>m.LoginModule)},
    {path:"Taskmanage",loadChildren:()=>import("./taskmange/taskmange.module").then((m)=>m.TaskmangeModule)},
    {path:"Attendance",loadChildren:()=>import("./attendance/attendance.module").then((m)=>m.AttendanceModule)},
    {path:"message",  loadChildren:()=>import("./message/message.module").then((m)=>m.MessageModule)},
    {path:"post",loadChildren:()=>import("./post/post.module").then((m)=>m.PostModule)},
    {path:"notification",loadChildren:()=>import("./notification/notification.module").then((m)=>m.NotificationModule)},
    {path:"Register",loadChildren:()=>import("./register/register.module").then((m)=>m.RegisterModule)},
    {path:"Forget",loadChildren:()=>import("./forgetpassword/forgetpassword.module").then((m)=>m.ForgetpasswordModule)},
    {path:"Setting",loadChildren:()=>import("./setting/setting.module").then((m)=>m.SettingModule)},
    {path:"dashboard",loadChildren:()=>import("./dashboard/dashboard.module").then((m)=>m.DashboardModule)},
    {path:"profile",loadChildren:()=>import("./profile/profile.module").then((m)=>m.ProfileModule)},
    {path:"ocr",loadChildren:()=>import("./ocr/ocr.module").then((m)=>m.OcrModule)},
    {path:"chat",loadChildren:()=>import("./chat/chat.module").then((m)=>m.ChatModule)},
    {path:"userrights",loadChildren:()=>import("./admin/admin.module").then((m)=>m.AdminModule)},
    {path:"Form",loadChildren:()=>import("./form/form.module").then((m)=>m.FormModule)},
    {path:"emp",loadChildren:()=>import("./employee/employee.module").then((m)=>m.EmployeeModule)},
    {path:"Holiday",loadChildren:()=>import("./holiday/holiday.module").then((m)=>m.HolidayModule)},
    {path:"Leavetype",loadChildren:()=>import("./leavetype/leavetype.module").then((m)=>m.LeavetypeModule)},
    {path:"Leavedeclaration",loadChildren:()=>import("./leavedeclaration/leavedeclaration.module").then((m)=>m.LeavedeclarationModule)},
    {path:"Leaveapplication",loadChildren:()=>import("./leaveapplication/leaveapplication.module").then((m)=>m.LeaveapplicationModule)},
    {path:"Emoj",loadChildren:()=>import("./emoj/emoj.module").then((m)=>m.EmojModule)},
    {path:"Currency",loadChildren:()=>import("./currency/currency.module").then((m)=>m.CurrencyModule)},


    //configure the Components 
    {path:"dash",component:DashboardComponent},
    {path:"main",component:MainpageComponent},
    {path:'login',component: LoginComponent},
    {path:'taskmanage', component:TaskmangeComponent },
    {path:"attend", component: AttendanceComponent},
    {path:"message",component:MessageComponent},
    {path:"post",component:PostComponent},
    {path:"notification",component:NotificationComponent},
    {path:"register",component:RegisterComponent},
    {path:"forget",component:ForgetpasswordComponent},
    {path:"setting",component:SettingComponent},
    {path:"profile/:id",component:ProfileComponent},
    {path:"ocr",component:OcrComponent},
    {path:"chat",component:ChatComponent},
    { path:'user', component: AdminComponent},
    {path:"form",component:FormComponent },
    {path:"employee",component:EmployeeComponent},
    { path:'holiday', component: HolidayComponent},
    { path:'leavetype', component: LeavetypeComponent},
    {path:"leavedeclaration",component:LeavedeclarationComponent},
    {path:"leaveapplication",component:LeaveapplicationComponent},
    {path:"emoj",component:EmojComponent},
    {path:'currency',component:CurrencyComponent},
    //Redirect to Login Page Directly
    {path: '', redirectTo: 'Login/login', pathMatch: 'full' },
   
];
