import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryfixationComponent } from './salaryfixation.component';

const routes: Routes = [
  {path:"salaryfixation",component:SalaryfixationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryfixationRoutingModule { }
