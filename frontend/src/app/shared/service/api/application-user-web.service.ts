import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ApplicationUserDto} from "../../dto/application-user.dto";

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserWebService {
  private specificUrl: string = "user/";

  constructor(private http: HttpClient) {
  }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllUsers(): Observable<ApplicationUserDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<ApplicationUserDto[]>(fullPath);
  }

  getUserById(userId: number): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + userId;
    return this.http.get<ApplicationUserDto>(fullPath);
  }

  getUsersByClassroom(classroomId: number): Observable<ApplicationUserDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindUsersByClassroom) + classroomId;
    return this.http.get<ApplicationUserDto[]>(fullPath);
  }

  getUsersByIds(userIds: number[]): Observable<ApplicationUserDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindUsersByIds);
    return this.http.post<ApplicationUserDto[]>(fullPath, userIds);
  }

  createUser(user: ApplicationUserDto): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<ApplicationUserDto>(fullPath, user);
  }

  updateUser(user: ApplicationUserDto): Observable<ApplicationUserDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<ApplicationUserDto>(fullPath, user);
  }

  deleteUser(userId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + userId;
    return this.http.delete<any>(fullPath);
  }
}
