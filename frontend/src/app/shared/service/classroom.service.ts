import {Injectable} from '@angular/core';
import {ClassroomWebService} from "./api/classroom-web.service";
import {BehaviorSubject} from "rxjs";
import {ClassroomDto} from "../dto/classroom.dto";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  allClassRoomsSubject: BehaviorSubject<ClassroomDto[]> = new BehaviorSubject<ClassroomDto[]>([]);

  constructor(private classroomWebService: ClassroomWebService) {
    this.getAllClassRooms();
  }

  getAllClassRooms() {
    this.classroomWebService.getAllClassRooms()
      .subscribe(
        classrooms => this.allClassRoomsSubject.next(classrooms)
      );
  }

  getClassroomById(id: number) {
    return this.classroomWebService.getClassRoomById(id);
  }

  createClassRoom(classRoom: ClassroomDto) {
    return this.classroomWebService.createClassRoom(classRoom);
  }

  updateClassRoom(classRoom: ClassroomDto) {
    return this.classroomWebService.updateClassRoom(classRoom);
  }

  deleteClassRoom(classRoomId: number) {
    return this.classroomWebService.deleteClassRoom(classRoomId);
  }
}
