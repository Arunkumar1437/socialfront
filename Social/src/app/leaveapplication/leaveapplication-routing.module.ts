import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveapplicationComponent } from './leaveapplication.component';

const routes: Routes = [
 {path:"leaveapplication",component:LeaveapplicationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveapplicationRoutingModule { }
