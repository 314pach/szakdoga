import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.get<MessageDto[]>(fullPath, {headers: this.createHeader()});
  }

  getMessageById(messageId: number): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + messageId;
    return this.http.get<MessageDto>(fullPath, {headers: this.createHeader()});
  }

  getMessagesByParties(userId1: number, userId2: number): Observable<MessageDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindMessagesByParties) + userId1 + "/" + userId2;
    return this.http.get<MessageDto[]>(fullPath, {headers: this.createHeader()});
  }

  createMessage(message: MessageDto): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<MessageDto>(fullPath, message, {headers: this.createHeader()});
  }

  updateMessage(message: MessageDto): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<MessageDto>(fullPath, message, {headers: this.createHeader()});
  }

  deleteMessage(messageId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + messageId;
    return this.http.delete<any>(fullPath, {headers: this.createHeader()});
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
