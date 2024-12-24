import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignTaskComponent } from './assign-task.component';

export const routes: Routes = [
  { path: 'assigntask/:id', component:AssignTaskComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignTaskRoutingModule { }
