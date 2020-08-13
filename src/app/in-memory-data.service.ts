import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const products = [
      { id: 11, name: 'Fruit', quantity: 1, price: 5 },
      { id: 12, name: 'Beer' , quantity: 1, price: 10 },
      { id: 13, name: 'Bread', quantity: 1, price: 3 },
      { id: 14, name: 'Soda', quantity: 1, price: 5 },
      { id: 15, name: 'Rice', quantity: 1, price: 20 },
      { id: 16, name: 'Water', quantity: 1, price: 2 },
      { id: 17, name: 'Cheese', quantity: 1, price: 9 },
      { id: 18, name: 'Book', quantity: 1, price: 20 },
      { id: 19, name: 'Soap', quantity: 1, price: 5 },
      { id: 20, name: 'Mask', quantity: 1, price: 25 }
    ];
    return {products};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}
