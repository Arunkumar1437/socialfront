import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskmangeComponent } from './taskmange.component';

export const routes: Routes = [
  { path: 'taskmanage', component:TaskmangeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskmangeRoutingModule { }
