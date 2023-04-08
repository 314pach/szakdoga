import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {HandinDto} from "../../dto/handin.dto";
import {Router} from "@angular/router";
import {AttachmentDto} from "../../dto/attachment.dto";

@Injectable({
  providedIn: 'root'
})
export class HandinWebService {

  private specificUrl: string = "handin/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllHandins(): Observable<HandinDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<HandinDto[]>(fullPath, {headers: this.createHeader()})
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

  getHandinById(handinId: number): Observable<HandinDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + handinId;
    return this.http.get<HandinDto>(fullPath, {headers: this.createHeader()})
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

  getHandinsByCommitmentId(commitmentId: number): Observable<HandinDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindHandinsByCommitment) + commitmentId;
    return this.http.get<HandinDto[]>(fullPath, {headers: this.createHeader()})
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

  createHandin(handin: HandinDto): Observable<HandinDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<HandinDto>(fullPath, handin, {headers: this.createHeader()})
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

  updateHandin(handin: HandinDto): Observable<HandinDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<HandinDto>(fullPath, handin, {headers: this.createHeader()})
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

  deleteHandin(handinId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + handinId;
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
