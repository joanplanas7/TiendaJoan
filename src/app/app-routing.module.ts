import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'productes', loadChildren: () => import('./pagines/productes/productes.module').then(m => m.ProductesModule) },
  { path: 'checkout', loadChildren: () => import('./pagines/checkout/checkout.module').then(m => m.CheckoutModule) },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
