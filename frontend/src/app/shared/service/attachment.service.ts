import { Injectable } from '@angular/core';
import {AttachmentWebService} from "./api/attachment-web.service";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private attachmentWebService: AttachmentWebService) { }
}
