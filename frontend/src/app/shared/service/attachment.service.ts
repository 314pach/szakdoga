import { Injectable } from '@angular/core';
import {AttachmentWebService} from "./api/attachment-web.service";
import {AttachmentDto} from "../dto/attachment.dto";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private attachmentWebService: AttachmentWebService) { }

  createAttachments(attachments: AttachmentDto[]) {
    return this.attachmentWebService.createAttachments(attachments);
  }

  getAttachmentByTaskId(taskId: number) {
    return this.attachmentWebService.getAttachmentsByTaskId(taskId);
  }

  deleteAttachments(ids: number[]){
    return this.attachmentWebService.deleteAttachmentsById(ids);
  }
}
