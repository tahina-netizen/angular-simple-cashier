import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Product[] = [];
  cost: number = 0;

  constructor(
    messageService: MessageService
  ) { }

  addToCart(product: Product, quantity: number): void{
    let index = this.products.indexOf(product);
    if(index < 0){
      product.quantity = quantity;
      this.products.push(product);
    }
    else{
      this.products[index].quantity += quantity;
    }
  }
  
  addToCost(product: Product, quantity: number): void{
    this.cost += product.price * quantity;
  }

  removeFromCart(product: Product, quantity: number): void {
    //UC: product exists in cartService.products
    product = this.products[this.products.indexOf(product)];
    if(product.quantity >= quantity){
      product.quantity -= quantity;
    }
    else{
      product.quantity = 0;
    }  
  }

  removeFromCost(product: Product, quantity: number): void {
    this.cost -= product.price * quantity;
  }

  getProducts(): Product[]{
    return this.products;
  }

  getCost(): number {
    return this.cost;
  }

  clear(): void {
    this.products = [];
    this.cost = 0;
  }

  getLength(): number {
    return this.products.length;
  }
}
