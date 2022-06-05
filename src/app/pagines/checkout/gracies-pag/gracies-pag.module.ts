import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraciesPagRoutingModule } from './gracies-pag-routing.module';
import { GraciesPagComponent } from './gracies-pag.component';


@NgModule({
  declarations: [
    GraciesPagComponent
  ],
  imports: [
    CommonModule,
    GraciesPagRoutingModule
  ]
})
export class GraciesPagModule { }
