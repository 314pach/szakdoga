import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {AttachmentDto} from "../../dto/attachment.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AttachmentWebService {

  private specificUrl: string = "attachment/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllAttachments(): Observable<AttachmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<AttachmentDto[]>(fullPath, {headers: this.createHeader()})
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

  getAttachmentById(attachmentId: number): Observable<AttachmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + attachmentId;
    return this.http.get<AttachmentDto>(fullPath, {headers: this.createHeader()})
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

  getAttachmentsByTaskId(taskId: number): Observable<AttachmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAttachmentByTask) + taskId;
    return this.http.get<AttachmentDto[]>(fullPath, {headers: this.createHeader()})
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

  createAttachment(attachment: AttachmentDto): Observable<AttachmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<AttachmentDto>(fullPath, attachment, {headers: this.createHeader()})
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

  createAttachments(attachments: AttachmentDto[]): Observable<AttachmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.CreateAll);
    return this.http.post<AttachmentDto[]>(fullPath, attachments, {headers: this.createHeader()})
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

  updateAttachment(attachment: AttachmentDto): Observable<AttachmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<AttachmentDto>(fullPath, attachment, {headers: this.createHeader()})
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

  deleteAttattachment(attachmentId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + attachmentId;
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

  deleteAttachmentsById(attachmentIds: number[]): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.DeleteAttachmentsById);
    return this.http.post<any>(fullPath, attachmentIds, {headers: this.createHeader()})
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
    // console.log(token);
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }
}
