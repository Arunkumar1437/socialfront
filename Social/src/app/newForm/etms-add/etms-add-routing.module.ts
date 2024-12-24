import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtmsAddComponent } from './etms-add.component';

const routes: Routes = [
  { path: 'etmsadd', component: EtmsAddComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtmsAddRoutingModule { }
