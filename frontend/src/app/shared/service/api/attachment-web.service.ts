import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {AttachmentDto} from "../../dto/attachment.dto";

@Injectable({
  providedIn: 'root'
})
export class AttachmentWebService {

  private specificUrl: string = "attachment/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllAttachments(): Observable<AttachmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<AttachmentDto[]>(fullPath, {headers: this.createHeader()});
  }

  getAttachmentById(attachmentId: number): Observable<AttachmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + attachmentId;
    return this.http.get<AttachmentDto>(fullPath, {headers: this.createHeader()});
  }

  getAttachmentsByTaskId(taskId: number): Observable<AttachmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAttachmentByTask) + taskId;
    return this.http.get<AttachmentDto[]>(fullPath, {headers: this.createHeader()});
  }

  createAttachment(attachment: AttachmentDto): Observable<AttachmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<AttachmentDto>(fullPath, attachment, {headers: this.createHeader()});
  }

  createAttachments(attachments: AttachmentDto[]): Observable<AttachmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.CreateAll);
    return this.http.post<AttachmentDto[]>(fullPath, attachments, {headers: this.createHeader()});
  }

  updateAttachment(attachment: AttachmentDto): Observable<AttachmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<AttachmentDto>(fullPath, attachment, {headers: this.createHeader()});
  }

  deleteAttattachment(attachmentId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + attachmentId;
    return this.http.delete<any>(fullPath, {headers: this.createHeader()});
  }

  deleteAttachmentsById(attachmentIds: number[]): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.DeleteAttachmentsById);
    return this.http.post<any>(fullPath, attachmentIds, {headers: this.createHeader()});
  }

  createHeader(): HttpHeaders {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }
}
