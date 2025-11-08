import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditdebitmasterComponent } from './creditdebitmaster.component';

const routes: Routes = [
  {path:"creditdebitmaster",component: CreditdebitmasterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditdebitmasterRoutingModule { }
