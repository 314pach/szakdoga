import { Component, OnInit } from '@angular/core';
import {ClassroomDto} from "../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../shared/service/classroom.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassroomComponent} from "./create-classroom/create-classroom.component";
import {UpdateClassroomComponent} from "./update-classroom/update-classroom.component";
import {DeleteClassroomComponent} from "./delete-classroom/delete-classroom.component";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  classrooms: ClassroomDto[] = [];

  constructor(
    private classroomService: ClassroomService,
    private dialog: MatDialog
  ) {
    this.classroomService.allClassRoomsSubject.subscribe(
      classrooms => {
        this.classrooms = classrooms;
        console.log(this.classrooms);
      }
    );

  }

  ngOnInit(): void {
  }

  create() {
    let dialogRef = this.dialog.open(
      CreateClassroomComponent, {
        width: '600px',
        maxHeight: '500px',
        autoFocus: "first-tabbable"
      });
  }

  update(classroom: ClassroomDto) {
    let dialogRef = this.dialog.open(
      UpdateClassroomComponent, {
        width: '600px',
        maxHeight: '500px',
        autoFocus: "first-tabbable",
        data: {classroom: classroom}
      });
  }

  delete(classroomId: number) {
    let dialogRef = this.dialog.open(
      DeleteClassroomComponent, {
        width: '600px',
        maxHeight: '500px',
      });
  }
}
