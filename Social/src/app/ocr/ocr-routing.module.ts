import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcrComponent } from './ocr.component';

const routes: Routes = [
  {path:"ocr",component:OcrComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcrRoutingModule { }
