import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {MessageDto} from "../../dto/message.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MessageWebService {

  private specificUrl: string = "message/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllMessages(): Observable<MessageDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<MessageDto[]>(fullPath, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
  }

  getMessageById(messageId: number): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + messageId;
    return this.http.get<MessageDto>(fullPath, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
  }

  getMessagesByParties(userId1: number, userId2: number): Observable<MessageDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindMessagesByParties) + userId1 + "/" + userId2;
    return this.http.get<MessageDto[]>(fullPath, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
  }

  createMessage(message: MessageDto): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<MessageDto>(fullPath, message, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
  }

  updateMessage(message: MessageDto): Observable<MessageDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<MessageDto>(fullPath, message, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
  }

  deleteMessage(messageId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + messageId;
    return this.http.delete<any>(fullPath, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
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
