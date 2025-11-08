import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveentryComponent } from './leaveentry.component';

const routes: Routes = [
  {path:'leaveentry',component:LeaveentryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveentryRoutingModule { }
