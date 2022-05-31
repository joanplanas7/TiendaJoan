import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductesComponent } from './productes.component';

const routes: Routes = [{ path: '', component: ProductesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductesRoutingModule { }
