import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomDto} from "../../../../../shared/dto/classroom.dto";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {FormControl, Validators} from "@angular/forms";
import {ClassroomService} from "../../../../../shared/service/classroom.service";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSelectChange} from "@angular/material/select";
import {switchMap} from "rxjs";
import {RoleEnum} from "../../../../../shared/enum/role.enum";

// import {isArrayEqual} from "@angular/compiler-cli/src/ngtsc/incremental/semantic_graph";

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.scss']
})
export class UpdateClassroomComponent {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  classrooms: ClassroomDto[] = [];

  students: ApplicationUserDto[] = [];

  checked: number[] = [];
  filteredStudents: ApplicationUserDto[] = [];

  search: string = "";

  nameControl: FormControl = new FormControl<string>("", Validators.required);
  subjectControl: FormControl = new FormControl<string>("", Validators.required);

  constructor(
    private dialog: MatDialogRef<UpdateClassroomComponent>,
    private classroomService: ClassroomService,
    private applicationUserService: ApplicationUserService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {classroom: ClassroomDto}
  ) {
    this.nameControl.setValue(this.data.classroom.name);
    this.subjectControl.setValue(this.data.classroom.subject);
    this.checked = [...this.data.classroom.applicationUserIds];
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
    )
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

  arraysEquals(a: number[], b:  number[]): boolean{
    // console.log(a);
    // console.log(b);
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  isDisabled() {
    if (this.nameControl.invalid || this.subjectControl.invalid) {
      return true;
    }
    return this.nameControl.value === this.data.classroom.name
      && this.subjectControl.value === this.data.classroom.subject
      && this.arraysEquals(this.checked.sort(), this.data.classroom.applicationUserIds.sort())
  }

  update() {
    if (!this.isDisabled()) {
      let classroom = new ClassroomDto(
        this.data.classroom.id,
        this.nameControl.value,
        this.subjectControl.value,
        this.data.classroom.commitmentPeriod,
        this.data.classroom.archived,
        this.data.classroom.modulIds,
        this.checked
      )
      // console.log(classroom)
      this.classroomService.updateClassRoom(classroom)
        .subscribe(
          classroom => {
            this._snackBar.open(
              "A(z) " + classroom.name + " " + classroom.subject + " osztály módosítása sikeres",
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
