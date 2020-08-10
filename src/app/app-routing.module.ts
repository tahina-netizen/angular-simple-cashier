import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component'
import { MarketComponent } from './market/market.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', redirectTo: '/market', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'market', component: MarketComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
