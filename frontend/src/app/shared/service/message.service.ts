import { Injectable } from '@angular/core';
import {MessageWebService} from "./api/message-web.service";
import {BehaviorSubject} from "rxjs";
import {MessageDto} from "../dto/message.dto";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {HttpHeaders} from "@angular/common/http";
import {environment, socketEnvironment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  selectedMessagesSubject: BehaviorSubject<MessageDto[]> = new BehaviorSubject<MessageDto[]>([]);
  selectedMessages: MessageDto[] = [];

  constructor(private messageWebService: MessageWebService) { }

  getSelectedMessages(userId1: number, userId2: number) {
    this.messageWebService.getMessagesByParties(userId1, userId2)
      .subscribe(
        messages => {
          this.selectedMessagesSubject.next(messages);
          this.selectedMessages = messages.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
        }
      );
  }

  createMessage(message: MessageDto) {
    return this.messageWebService.createMessage(message);
  }

  public stompClient: any;

  connectToSelectedMessages() {
    const socket = new SockJS(socketEnvironment + 'socket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    let token = localStorage.getItem("token");
    this.stompClient.connect({Authorization: `Bearer ${token}`}, function (frame: any) {
      _this.stompClient.subscribe('/openedMessages', function (newMessageResponse: any) {
        let newMessage = JSON.parse(newMessageResponse.body) as MessageDto;
        _this.selectedMessages.unshift(newMessage);
      });
    });
  }

  disconnectFromSelectedMessages() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendMessageToSelected(newMessage: MessageDto) {
    // console.log(newMessage);
    let token = localStorage.getItem("token");
    this.stompClient.send(
      '/application/addMessageToOpenedConversation',
      {Authorization: `Bearer ${token}`},
      JSON.stringify({
        id: newMessage.id,
        timestamp: newMessage.timestamp,
        body: newMessage.body,
        status: newMessage.status,
        labels: newMessage.labels,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
      })
    );
  }
}
