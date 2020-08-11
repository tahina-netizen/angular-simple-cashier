import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  products: Product[];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      p => this.products = p
    );
  }

  setProducts(products$: Observable<Product[]>): void {
    products$.subscribe(
      p => this.products = p
    )
  }

  getCartLength(): number{
    return this.cartService.getLength();
  }

  add(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
    this.cartService.addToCost(product, quantity);
  }

}
