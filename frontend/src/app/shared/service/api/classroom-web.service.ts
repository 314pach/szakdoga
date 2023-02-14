import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ClassroomDto} from "../../dto/classroom.dto";

@Injectable({
  providedIn: 'root'
})
export class ClassroomWebService {

  private specificUrl: string = "classroom/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllClassRooms(): Observable<ClassroomDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<ClassroomDto[]>(fullPath);
  }

  getClassRoomById(classRoomId: number): Observable<ClassroomDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + classRoomId;
    return this.http.get<ClassroomDto>(fullPath);
  }

  createClassRoom(classRoom: ClassroomDto): Observable<ClassroomDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<ClassroomDto>(fullPath, classRoom);
  }

  updateClassRoom(classRoom: ClassroomDto): Observable<ClassroomDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<ClassroomDto>(fullPath, classRoom);
  }

  deleteClassRoom(classRoomId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + classRoomId;
    return this.http.delete<any>(fullPath);
  }
}
