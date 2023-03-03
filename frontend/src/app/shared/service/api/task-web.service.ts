import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {TaskDto} from "../../dto/task.dto";

@Injectable({
  providedIn: 'root'
})
export class TaskWebService {

  private specificUrl: string = "task/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllTasks(): Observable<TaskDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<TaskDto[]>(fullPath);
  }

  getTasksByModulId(modulId: number): Observable<TaskDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindTaskByModul) + modulId;
    return this.http.get<TaskDto[]>(fullPath);
  }

  getTaskById(taskId: number): Observable<TaskDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + taskId;
    return this.http.get<TaskDto>(fullPath)
  }

  createTask(task: TaskDto): Observable<TaskDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<TaskDto>(fullPath, task);
  }

  updateTask(task: TaskDto): Observable<TaskDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<TaskDto>(fullPath, task);
  }

  deleteTask(taskId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + taskId;
    return this.http.delete<any>(fullPath);
  }
}
