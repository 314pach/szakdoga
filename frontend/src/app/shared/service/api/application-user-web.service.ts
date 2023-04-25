import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {ApplicationUserDto} from "../../dto/application-user.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserWebService {
  private specificUrl: string = "user/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllUsers(): Observable<ApplicationUserDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<ApplicationUserDto[]>(fullPath, {headers: this.createHeader()})
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

  getUserById(userId: number): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + userId;
    return this.http.get<ApplicationUserDto>(fullPath, {headers: this.createHeader()})
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

  getUserByToken(token: string): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindUserByToken) + token;
    return this.http.get<ApplicationUserDto>(fullPath, {headers: this.createHeader()})
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

  getUsersByClassroom(classroomId: number): Observable<ApplicationUserDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindUsersByClassroom) + classroomId;
    return this.http.get<ApplicationUserDto[]>(fullPath, {headers: this.createHeader()})
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

  getUsersByIds(userIds: number[]): Observable<ApplicationUserDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindUsersByIds);
    return this.http.post<ApplicationUserDto[]>(fullPath, userIds, {headers: this.createHeader()})
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

  createUser(user: ApplicationUserDto): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<ApplicationUserDto>(fullPath, user, {headers: this.createHeader()})
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

  updateUser(user: ApplicationUserDto): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<ApplicationUserDto>(fullPath, user, {headers: this.createHeader()})
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

  updateUserPassword(user: ApplicationUserDto): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.UpdatePassword);
    return this.http.put<ApplicationUserDto>(fullPath, user, {headers: this.createHeader()})
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

  deleteUser(userId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + userId;
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
    // console.log(token);
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }
}
