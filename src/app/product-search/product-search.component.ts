import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  @Output() searchedProducts = new EventEmitter<Observable<Product[]>>(); 
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  search(term: string): void {
    this.searchedProducts.emit(this.productService.searchProducts(term));
  }

  onSubmit(f: NgForm): void {
    this.search(f.value.term);
  }
}
