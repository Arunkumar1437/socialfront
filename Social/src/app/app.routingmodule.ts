import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PrintComponent } from './print/print.component';
import { ViewComponent } from './view/view.component';
import { EtmsAddComponent } from './newForm/etms-add/etms-add.component';
import { AddEmpComponent } from './newForm/etms-add/add-emp/add-emp.component';
import { TaskmangeComponent } from './taskmange/taskmange.component';
import { AssignTaskComponent } from './taskmange/assign-task/assign-task.component';
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

export const routes: Routes = [
    //configure the modules
    {path:"mainpage",loadChildren:()=>import("./mainpage/mainpage.module").then((m)=>m.MainpageModule)},
    {path:"Add",loadChildren:()=>import("./add/add.module").then((m)=>m.AddModule)},
    {path:"Login",loadChildren:()=>import("./login/login.module").then((m)=>m.LoginModule)},
    {path:"Print",loadChildren:()=>import("./print/print.module").then((m)=>m.PrintModule)},
    {path:"View",loadChildren:()=>import("./view/view.module").then((m)=>m.ViewModule)},
    {path:"EtmsAdd",loadChildren:()=>import("./newForm/etms-add/etms-add.module").then((m)=>m.EtmsAddModule)},
    {path:"Addemp",loadChildren:()=>import("./newForm/etms-add/add-emp/add-emp.module").then((m)=>m.AddEmpModule)},
    {path:"Taskmanage",loadChildren:()=>import("./taskmange/taskmange.module").then((m)=>m.TaskmangeModule)},
    {path:"Assigntask",loadChildren:()=>import("./taskmange/assign-task/assign-task.module").then((m)=>m.AssignTaskModule)},
    {path:"Attend",loadChildren:()=>import("./attendance/attendance.module").then((m)=>m.AttendanceModule)},
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
    {path:"Admin",loadChildren:()=>import("./admin/admin.module").then((m)=>m.AdminModule)},
    {path:"Form",loadChildren:()=>import("./form/form.module").then((m)=>m.FormModule)},



    //configure the Components 
    {path:"dash",component:DashboardComponent},
    {path:"main",component:MainpageComponent},
    {path:"add/:id",component :AddComponent},
    {path: 'login',component: LoginComponent},
    {path:"print/:id",component:PrintComponent},
    {path:"view/:id", component:ViewComponent},
    {path: 'etmsadd', component: EtmsAddComponent},
    {path: 'addemp/:id', component: AddEmpComponent},
    {path: 'taskmanage', component:TaskmangeComponent },
    {path: 'assigntask/:id', component:AssignTaskComponent },
    {path: 'attend', component: AttendanceComponent},
    {path:"message",component:MessageComponent},
    {path:"post",component:PostComponent},
    {path:"notification",component:NotificationComponent},
    {path:"register",component:RegisterComponent},
    {path:"forget",component:ForgetpasswordComponent},
    {path:"setting",component:SettingComponent},
    {path:"profile/:id",component:ProfileComponent},
    {path:"ocr",component:OcrComponent},
    {path:"chat",component:ChatComponent},
    { path:'admin', component: AdminComponent},
    {path:"form",component:FormComponent },


    //Redirect to Login Page Directly
    {path: '', redirectTo: 'Login/login', pathMatch: 'full' },
   
];
