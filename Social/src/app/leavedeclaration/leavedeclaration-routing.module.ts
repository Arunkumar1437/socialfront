import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavedeclarationComponent } from './leavedeclaration.component';

const routes: Routes = [
    {path:"leavedeclaration",component:LeavedeclarationComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavedeclarationRoutingModule { }
