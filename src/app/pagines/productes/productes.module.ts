import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductesRoutingModule } from './productes-routing.module';
import { ProductesComponent } from './productes.component';
import { ProducteComponent } from './producte/producte.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ProductesComponent,
    ProducteComponent
  ],
  imports: [
    CommonModule,
    ProductesRoutingModule,
    MaterialModule,
  ]
})
export class ProductesModule { }
