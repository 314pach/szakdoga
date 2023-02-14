import { Injectable } from '@angular/core';
import {MessageWebService} from "./api/message-web.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private messageWebService: MessageWebService) { }
}
