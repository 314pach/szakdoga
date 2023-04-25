import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {BadgeDto} from "../../dto/badge.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BadgeWebService {

  private specificUrl: string = "badge/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllBadges(): Observable<BadgeDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<BadgeDto[]>(fullPath, {headers: this.createHeader()})
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

  getBadgesByIds(badgeIds: number[]): Observable<BadgeDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindBadgesByIds);
    return this.http.post<BadgeDto[]>(fullPath, badgeIds, {headers: this.createHeader()})
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

  getBadgeById(badgeId: number): Observable<BadgeDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + badgeId;
    return this.http.get<BadgeDto>(fullPath, {headers: this.createHeader()})
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

  createBadge(badge: BadgeDto): Observable<BadgeDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<BadgeDto>(fullPath, badge, {headers: this.createHeader()})
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

  updateBadge(badge: BadgeDto): Observable<BadgeDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<BadgeDto>(fullPath, badge, {headers: this.createHeader()})
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

  deleteBadge(badgeId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + badgeId;
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
