import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {BadgeDto} from "../../dto/badge.dto";

@Injectable({
  providedIn: 'root'
})
export class BadgeWebService {

  private specificUrl: string = "badge/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllBadges(): Observable<BadgeDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<BadgeDto[]>(fullPath, {headers: this.createHeader()});
  }

  getBadgeById(badgeId: number): Observable<BadgeDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + badgeId;
    return this.http.get<BadgeDto>(fullPath, {headers: this.createHeader()});
  }

  createBadge(badge: BadgeDto): Observable<BadgeDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<BadgeDto>(fullPath, badge, {headers: this.createHeader()});
  }

  updateBadge(badge: BadgeDto): Observable<BadgeDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<BadgeDto>(fullPath, badge, {headers: this.createHeader()});
  }

  deleteBadge(badgeId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + badgeId;
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
