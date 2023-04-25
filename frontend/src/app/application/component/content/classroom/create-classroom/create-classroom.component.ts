import {Component} from '@angular/core';
import {ClassroomDto} from "../../../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../../../shared/service/classroom.service";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {MatSelectChange} from "@angular/material/select";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {RoleEnum} from "../../../../../shared/enum/role.enum";

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.scss']
})
export class CreateClassroomComponent {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  classrooms: ClassroomDto[] = [];

  students: ApplicationUserDto[] = [];

  checked: number[] = [];
  filteredStudents: ApplicationUserDto[] = [];

  search: string = "";

  nameControl: FormControl = new FormControl<string>("", Validators.required);
  subjectControl: FormControl = new FormControl<string>("", Validators.required);

  constructor(
    private dialog: MatDialogRef<CreateClassroomComponent>,
    private classroomService: ClassroomService,
    private applicationUserService: ApplicationUserService,
    private _snackBar: MatSnackBar
  ) {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).pipe(
      switchMap(
        user => {
          this.loggedInUser = user;
          this.classroomService.getClassRoomsByUser(user.id!);
          return this.classroomService.allClassRoomsSubject;
        }
      )
    ).subscribe(
      classrooms => {
        this.classrooms = classrooms;
        // console.log(this.classrooms);
      }
    );
    this.applicationUserService.getAllUsers();
    this.applicationUserService.allUsersSubject.subscribe(
      users => {
        this.students = users.filter(user => user.role === RoleEnum.STUDENT);
        this.filteredStudents = users.filter(user => user.role === RoleEnum.STUDENT);
      }
    );
  }

  doSearch() {
    this.filteredStudents = this.students.filter(student => student.name.toLowerCase().startsWith(this.search.toLowerCase()));
  }

  checkStudent(studentId: number) {
    if (this.checked.includes(studentId)){
      this.checked = this.checked.filter(id => id !== studentId);
    } else {
      this.checked.push(studentId);
    }
  }

  filterByClass($event: MatSelectChange) {
    if($event.value === null) {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter(
        student => $event.value.applicationUserIds.includes(student.id)
      );
    }
  }

  addAll() {
    this.filteredStudents.forEach(
      student => {
        if (!this.checked.includes(student.id!)){
          this.checked.push(student.id!);
        }
      }
    );
  }

  removeAll() {
    this.filteredStudents.forEach(
      student => this.checked = this.checked.filter(studentId => studentId !== student.id)
    );
  }

  isDisabled() {
    return this.nameControl.invalid || this.subjectControl.invalid;
  }

  save() {
    if (!this.isDisabled()) {
      this.checked.push(this.loggedInUser.id!);
      let classroom = new ClassroomDto(
        null,
        this.nameControl.value,
        this.subjectControl.value,
        false,
        false,
        [],
        this.checked
      )
      // console.log(classroom)
      this.classroomService.createClassRoom(classroom)
        .subscribe(
          classroom => {
            this._snackBar.open(
            "A(z) " + classroom.name + " " + classroom.subject + " osztály létrehozása sikeres",
            "Ok",
            {duration: 5000}
          );
          this.classroomService.getClassRoomsByUser(this.loggedInUser.id!);
          }
        );
      this.dialog.close();
    }
  }

}
