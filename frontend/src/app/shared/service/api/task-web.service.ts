import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {TaskDto} from "../../dto/task.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TaskWebService {

  private specificUrl: string = "task/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllTasks(): Observable<TaskDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<TaskDto[]>(fullPath, {headers: this.createHeader()})
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

  getTasksByModulId(modulId: number): Observable<TaskDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindTaskByModul) + modulId;
    return this.http.get<TaskDto[]>(fullPath, {headers: this.createHeader()})
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

  getTaskById(taskId: number): Observable<TaskDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + taskId;
    return this.http.get<TaskDto>(fullPath, {headers: this.createHeader()})
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

  getTasksByIds(taskIds: number[]): Observable<TaskDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindTasksByIds);
    return this.http.post<TaskDto[]>(fullPath, taskIds, {headers: this.createHeader()})
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

  createTask(task: TaskDto): Observable<TaskDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<TaskDto>(fullPath, task, {headers: this.createHeader()})
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

  updateTask(task: TaskDto): Observable<TaskDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<TaskDto>(fullPath, task, {headers: this.createHeader()})
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

  deleteTask(taskId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + taskId;
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
