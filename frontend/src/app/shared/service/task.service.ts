import { Injectable } from '@angular/core';
import {TaskWebService} from "./api/task-web.service";
import {BehaviorSubject} from "rxjs";
import {TaskDto} from "../dto/task.dto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksByModulIdSubject: BehaviorSubject<TaskDto[]> = new BehaviorSubject<TaskDto[]>([]);

  constructor(private taskWebService: TaskWebService) { }

  getTasksByModulId(modulId: number) {
    this.taskWebService.getTasksByModulId(modulId)
      .subscribe(
        tasks => this.tasksByModulIdSubject.next(tasks)
      );
  }
}
