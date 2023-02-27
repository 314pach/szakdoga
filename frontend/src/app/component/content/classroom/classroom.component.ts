import { Component, OnInit } from '@angular/core';
import {ClassroomDto} from "../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../shared/service/classroom.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassroomComponent} from "./create-classroom/create-classroom.component";
import {UpdateClassroomComponent} from "./update-classroom/update-classroom.component";
import {DeleteClassroomComponent} from "./delete-classroom/delete-classroom.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  classrooms: ClassroomDto[] = [];

  constructor(
    private classroomService: ClassroomService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.classroomService.allClassRoomsSubject.subscribe(
      classrooms => {
        this.classrooms = classrooms.filter(classroom => !classroom.archived);
        console.log(this.classrooms);
      }
    );

  }

  ngOnInit(): void {
  }

  create() {
    let dialogRef = this.dialog.open(
      CreateClassroomComponent, {
        width: '1000px',
        height: '460px',
        autoFocus: "first-tabbable"
      });
  }

  update(classroom: ClassroomDto) {
    let dialogRef = this.dialog.open(
      UpdateClassroomComponent, {
        width: '1000px',
        height: '460px',
        autoFocus: "first-tabbable",
        data: {classroom: classroom}
      });
  }

  delete(classroom: ClassroomDto) {
    let dialogRef = this.dialog.open(
      DeleteClassroomComponent, {
        width: '600px',
        maxHeight: '500px',
        data: {classroom: classroom}
      });
  }

  archive(classroom: ClassroomDto) {
    let archivedClassroom = new ClassroomDto(
      classroom.id,
      classroom.name,
      classroom.subject,
      true,
      classroom.modulIds,
      classroom.applicationUserIds
    )
    this.classroomService.updateClassRoom(archivedClassroom)
      .subscribe(
        classroom => {
          this._snackBar.open(
            "A(z) " + classroom.name + " " + classroom.subject + " osztály archiválása sikeres sikeres",
            "Ok",
            {duration: 5000}
          );
          this.classroomService.getAllClassRooms();
        }
      );
  }

  unarchive(classroom: ClassroomDto) {
    let archivedClassroom = new ClassroomDto(
      classroom.id,
      classroom.name,
      classroom.subject,
      false,
      classroom.modulIds,
      classroom.applicationUserIds
    )
    this.classroomService.updateClassRoom(archivedClassroom)
      .subscribe(
        classroom => {
          this._snackBar.open(
            "A(z) " + classroom.name + " " + classroom.subject + " osztály aktiválása sikeres sikeres",
            "Ok",
            {duration: 5000}
          );
          this.classroomService.getAllClassRooms();
        }
      );
  }
}
