import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  cost: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  setProducts(products: Product[]): void {
    this.products = products;
  }
  
  ngOnInit(): void {
    this.getProducts();
    this.getCost();
  }

  getProducts(): void {
    this.products = this.cartService.getProducts();
  }

  getCost(): void {
    this.cost = this.cartService.getCost();
  }

  search(term: string): Product[] {
    return this.cartService.search(term);
  }

  remove(product: Product, quantity: number): void {
    this.cartService.removeFromCart(product, quantity);
    this.cartService.removeFromCost(product, quantity);
    this.getCost();
  }
}
