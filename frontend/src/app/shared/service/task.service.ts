import { Injectable } from '@angular/core';
import {TaskWebService} from "./api/task-web.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private taskWebService: TaskWebService) { }
}
