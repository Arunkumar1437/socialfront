import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmojComponent } from './emoj.component';

const routes: Routes = [
  {path:'emoj',component:EmojComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmojRoutingModule { }
