import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {ModulDto} from "../../dto/modul.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModulWebService {

  private specificUrl: string = "modul/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllModuls(): Observable<ModulDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<ModulDto[]>(fullPath, {headers: this.createHeader()})
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

  getModulById(modulId: number): Observable<ModulDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + modulId;
    return this.http.get<ModulDto>(fullPath, {headers: this.createHeader()})
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

  getModulsByIds(classroomIds: number[]): Observable<ModulDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindModulsByClassroom);
    return this.http.post<ModulDto[]>(fullPath, classroomIds, {headers: this.createHeader()})
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

  getModulsByCreator(creatorId: number): Observable<ModulDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindModulsByCreator) + creatorId;
    return this.http.get<ModulDto[]>(fullPath, {headers: this.createHeader()})
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

  createModul(modul: ModulDto): Observable<ModulDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<ModulDto>(fullPath, modul, {headers: this.createHeader()})
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

  updateModul(modul: ModulDto): Observable<ModulDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<ModulDto>(fullPath, modul, {headers: this.createHeader()})
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

  deleteModul(modulId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + modulId;
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
