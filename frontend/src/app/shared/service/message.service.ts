import { Injectable } from '@angular/core';
import {MessageWebService} from "./api/message-web.service";
import {BehaviorSubject} from "rxjs";
import {MessageDto} from "../dto/message.dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  selectedMessagesSubject: BehaviorSubject<MessageDto[]> = new BehaviorSubject<MessageDto[]>([]);

  constructor(private messageWebService: MessageWebService) { }

  getSelectedMessages(userId1: number, userId2: number) {
    this.messageWebService.getMessagesByParties(userId1, userId2)
      .subscribe(
        messages => this.selectedMessagesSubject.next(messages)
      );
  }

  createMessage(message: MessageDto) {
    return this.messageWebService.createMessage(message);
  }
}
