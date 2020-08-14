import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products
    );
  }
  
  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe();
    this.products = this.products.filter(p => p.id !== product.id)
  }

  addProduct(name: string, price: number): void {
    this.productService.addProduct({id: null, name: name, price: price, quantity: 1} as Product).subscribe(
      p => this.products.push(p)
    );
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe();
  }

  setProducts(products$: Observable<Product[]>): void {
    products$.subscribe(
      products => this.products = products
    )
  }

  isValid(f: NgForm): boolean {
    console.log(f.value);
    let res = true;
    if(f.value.productName === ''){
      res = false;
    }
    console.log(f.value.price);
    if(f.value.price === '' || isNaN(f.value.price)){
      res = false;
    }
    return res;
  }

  onSubmit(f: NgForm): void {
    if(this.isValid(f)){
      this.addProduct(f.value.productName, +f.value.price);
      f.resetForm({
        productName: '',
        price: ''
      });
    }
    else{
      this.messageService.add("adding product failed, invalid data")
    }
  }
}
