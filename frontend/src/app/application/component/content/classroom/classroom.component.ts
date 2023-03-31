import { Component, OnInit } from '@angular/core';
import {ClassroomDto} from "../../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../../shared/service/classroom.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassroomComponent} from "./create-classroom/create-classroom.component";
import {UpdateClassroomComponent} from "./update-classroom/update-classroom.component";
import {DeleteClassroomComponent} from "./delete-classroom/delete-classroom.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RoleEnum} from "../../../../shared/enum/role.enum";
import {ApplicationUserService} from "../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../shared/dto/application-user.dto";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  allClassrooms: ClassroomDto[] = [];
  classrooms: ClassroomDto[] = [];
  archived: boolean = false;
  isTeacher: boolean = false;

  constructor(
    private applicationUserService: ApplicationUserService,
    private classroomService: ClassroomService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    let token = localStorage.getItem("token");
    applicationUserService.getUserByToken(token!).subscribe(user => {
      // console.log(user);
      this.loggedInUser = user;
      this.isTeacher = (user.role === RoleEnum.TEACHER);
    })
    //todo classrooms for the user!!!
    this.classroomService.allClassRoomsSubject.subscribe(
      classrooms => {
        this.allClassrooms = classrooms;
        if (this.archived) {
          this.classrooms = classrooms.filter(classroom => classroom.archived);
        } else {
          this.classrooms = classrooms.filter(classroom => !classroom.archived);
        }
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
          this.classroomService.getClassRoomsByUser(this.loggedInUser.id!);
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
            "A(z) " + classroom.name + " " + classroom.subject + " osztály aktiválása sikeres",
            "Ok",
            {duration: 5000}
          );
          this.classroomService.getClassroomById(this.loggedInUser.id!);
        }
      );
  }

  openArchive() {
    this.archived = !this.archived;
    this.classrooms = this.allClassrooms.filter(classroom => classroom.archived);
  }

  closeArchive() {
    this.archived = !this.archived;
    this.classrooms = this.allClassrooms.filter(classroom => !classroom.archived);
  }

  open(classroom: ClassroomDto) {
    this.router.navigate(["classroom/modul"], {queryParams: {classroomId: classroom.id}});
  }
}
