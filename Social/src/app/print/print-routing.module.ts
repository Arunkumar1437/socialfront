import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './print.component';

const routes: Routes = [

  {path:"print/:id",component:PrintComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRoutingModule { }
