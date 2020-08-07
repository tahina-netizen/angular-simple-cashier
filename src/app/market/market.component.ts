import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  products: Product[];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  setProducts(products$: Observable<Product[]>): void {
    products$.subscribe(
      p => this.products = p
    )
  }

  getCartLength(): number{
    return this.cartService.getLength();
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.add(product, quantity);
  }

}
