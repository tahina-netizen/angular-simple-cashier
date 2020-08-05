import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor() { }

  add(message: string): void {
    this.messages.push(message);
  }
  
  clear(): void {
    this.messages = [];
  }

  getMessages(): string[] {
    let len = this.messages.length;
    if(len > 0){
      return this.messages;
    }
    return null;
  }
}
