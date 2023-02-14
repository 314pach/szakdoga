import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {MessageDto} from "../../dto/message.dto";

@Injectable({
  providedIn: 'root'
})
export class MessageWebService {

  private specificUrl: string = "message/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllMessages(): Observable<MessageDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<MessageDto[]>(fullPath);
  }

  getMessageById(messageId: number): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + messageId;
    return this.http.get<MessageDto>(fullPath);
  }

  createMessage(message: MessageDto): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<MessageDto>(fullPath, message);
  }

  updateMessage(message: MessageDto): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<MessageDto>(fullPath, message);
  }

  deleteMessage(messageId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + messageId;
    return this.http.delete<any>(fullPath);
  }
}
