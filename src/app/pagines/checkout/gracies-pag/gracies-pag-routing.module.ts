import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraciesPagComponent } from './gracies-pag.component';

const routes: Routes = [{ path: '', component: GraciesPagComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraciesPagRoutingModule { }
