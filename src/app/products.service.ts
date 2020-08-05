import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from './product';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = "api/products";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(_ => this.log('products fetched'))
    );
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
      tap(_ => this.log(`product fetched id=${id}`) )
    );
  }
  
  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product    id=${newProduct.id}`))
    );
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.productsUrl}/${product.id}`, this.httpOptions).pipe(
      tap(_ => {this.log(`deleted product id=${product.id}`)})
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found product(s) matching ${term}`):
        this.log(`no products matching ${term}`)
      )
    );
  }

  updateProduct(product: Product): Observable<any>{
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`))
    )
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
