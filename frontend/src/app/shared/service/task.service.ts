import { Injectable } from '@angular/core';
import {TaskWebService} from "./api/task-web.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDto} from "../dto/task.dto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksByModulIdSubject: BehaviorSubject<TaskDto[]> = new BehaviorSubject<TaskDto[]>([]);

  constructor(private taskWebService: TaskWebService) { }

  getTasksByModulIdAndRefreshSubject(modulId: number) {
    this.taskWebService.getTasksByModulId(modulId)
      .subscribe(
        tasks => this.tasksByModulIdSubject.next(tasks)
      );
  }

  getTasksByModulId(modulId: number) : Observable<TaskDto[]> {
    return this.taskWebService.getTasksByModulId(modulId);
  }

  createTask(task: TaskDto) {
    return this.taskWebService.createTask(task);
  }

  updateTask(task: TaskDto) {
    return this.taskWebService.updateTask(task);
  }

  deleteTask(taskId: number) {
    return this.taskWebService.deleteTask(taskId);
  }
}
