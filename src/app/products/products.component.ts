import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../products.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products$ = this.productService.getProducts();
  }
  
  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product)
  }

  addProduct(name: string): void {
    this.productService.addProduct({id: null, name: name} as Product).subscribe();
  }

  searchProducts(term: string): void {
    this.products$ = this.productService.searchProducts(term);
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe();
  }
}
