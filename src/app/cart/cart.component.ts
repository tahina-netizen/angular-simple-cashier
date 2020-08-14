import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  searchedProductsAreSet: boolean = false;

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
    this.cartService.removeFromCost(product, quantity);
    this.cartService.removeFromCart(product, quantity);
    if(this.searchedProductsAreSet){
      let index = this.indexOf(product);
      product = this.products[index];
      if(product.quantity > quantity){
        product.quantity -= quantity;
      }
      else{
        product.quantity = 0;
        this.products.splice(index, 1);
      }
    }
    this.getCost();
  }

  setSearchedProducts(f: NgForm): void {
    this.searchedProductsAreSet = true;
    this.setProducts(this.search(f.value.term))
  }

  indexOf(product: Product): number{
    //return the index of <product> in cartComponent.products array
    //return -1 if <product> not found
    let index = -1;
    let len = this.products.length
    let id = product.id;
    let i = 0;
    let found = false;
    while(i < len && !found){
      if(this.products[i].id === id){
        index = i;
        found = true
      }
      i += 1;
    }
    return index;
  }

  getAllProducts(): void {
    this.getProducts();
    this.searchedProductsAreSet = false;
  }
}
