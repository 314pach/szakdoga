import { Injectable } from '@angular/core';
import {ClassroomWebService} from "./api/classroom-web.service";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private classroomWebService: ClassroomWebService) { }
}
