import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ModulDto} from "../../dto/modul.dto";

@Injectable({
  providedIn: 'root'
})
export class ModulWebService {

  private specificUrl: string = "modul/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllModuls(): Observable<ModulDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<ModulDto[]>(fullPath, {headers: this.createHeader()});
  }

  getModulById(modulId: number): Observable<ModulDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + modulId;
    return this.http.get<ModulDto>(fullPath, {headers: this.createHeader()});
  }

  getModulsByIds(classroomIds: number[]): Observable<ModulDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindModulsByClassroom);
    return this.http.post<ModulDto[]>(fullPath, classroomIds, {headers: this.createHeader()});
  }

  getModulsByCreator(creatorId: number): Observable<ModulDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindModulsByCreator) + creatorId;
    return this.http.get<ModulDto[]>(fullPath, {headers: this.createHeader()});
  }

  createModul(modul: ModulDto): Observable<ModulDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<ModulDto>(fullPath, modul, {headers: this.createHeader()});
  }

  updateModul(modul: ModulDto): Observable<ModulDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<ModulDto>(fullPath, modul, {headers: this.createHeader()});
  }

  deleteModul(modulId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + modulId;
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
