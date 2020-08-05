import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: string[] = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
  }

  getLast(): string {
    return this.messages[this.messages.length-1];
  }


}

