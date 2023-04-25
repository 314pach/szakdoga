import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {ClassroomDto} from "../../dto/classroom.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClassroomWebService {

  private specificUrl: string = "classroom/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllClassRooms(): Observable<ClassroomDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<ClassroomDto[]>(fullPath, {headers: this.createHeader()})
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

  getClassRoomsByUser(userId: number): Observable<ClassroomDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindClassroomsByUser) + userId;
    return this.http.get<ClassroomDto[]>(fullPath, {headers: this.createHeader()})
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

  getClassRoomById(classRoomId: number): Observable<ClassroomDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + classRoomId;
    return this.http.get<ClassroomDto>(fullPath, {headers: this.createHeader()})
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

  createClassRoom(classRoom: ClassroomDto): Observable<ClassroomDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<ClassroomDto>(fullPath, classRoom, {headers: this.createHeader()})
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

  updateClassRoom(classRoom: ClassroomDto): Observable<ClassroomDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<ClassroomDto>(fullPath, classRoom, {headers: this.createHeader()})
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

  deleteClassRoom(classRoomId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + classRoomId;
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
