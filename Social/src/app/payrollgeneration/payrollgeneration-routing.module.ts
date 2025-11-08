import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollgenerationComponent } from './payrollgeneration.component';

const routes: Routes = [
  {path:'payrollgeneration',component:PayrollgenerationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollgenerationRoutingModule { }
