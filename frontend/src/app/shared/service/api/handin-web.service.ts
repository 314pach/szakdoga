import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HandinDto} from "../../dto/handin.dto";

@Injectable({
  providedIn: 'root'
})
export class HandinWebService {

  private specificUrl: string = "handin/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllHandins(): Observable<HandinDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<HandinDto[]>(fullPath);
  }

  getHandinById(handinId: number): Observable<HandinDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + handinId;
    return this.http.get<HandinDto>(fullPath);
  }

  createHandin(handin: HandinDto): Observable<HandinDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<HandinDto>(fullPath, handin);
  }

  updateHandin(handin: HandinDto): Observable<HandinDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<HandinDto>(fullPath, handin);
  }

  deleteHandin(handinId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + handinId;
    return this.http.delete<any>(fullPath);
  }
}
