import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApplicationUserService} from "../../../../../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../../../../../shared/dto/application-user.dto";

@Component({
  selector: 'app-assemble-team',
  templateUrl: './assemble-team.component.html',
  styleUrls: ['./assemble-team.component.scss']
})
export class AssembleTeamComponent implements OnInit{
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  students: ApplicationUserDto[] = [];
  checked: Map<number, string> = new Map;
  filteredStudents: ApplicationUserDto[] = [];
  search: string = "";

  constructor(
    private applicationUserService: ApplicationUserService,
    private dialog: MatDialogRef<AssembleTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {classroomId: number, headcount: number, members: Map<number, string>}
  ) {
  }

  arraysEquals(a: number[], b: number[]): boolean {
    // console.log(a);
    // console.log(b);
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  isDisabled() {
    // console.log(Array.from(this.checked.keys()).sort())
    // console.log(Array.from(this.data.members.keys()).sort())
    return this.checked.size !== this.data.headcount || this.arraysEquals(Array.from(this.checked.keys()).sort(), Array.from(this.data.members.keys()).sort());
  }

  save() {
    if (!this.isDisabled()){
      this.checked.set(this.loggedInUser.id!, this.loggedInUser.name);
      this.dialog.close(this.checked);
    }
  }

  ngOnInit(): void {
    this.checked = new Map(this.data.members);
    this.applicationUserService.loggedInUserSubject
      .subscribe( user => this.loggedInUser = user);
    this.applicationUserService.getUserByClassroom(this.data.classroomId).subscribe(
      users => {
        this.students = users.filter(user => !user.role);
        this.filteredStudents = users.filter(user => !user.role && user.id !== this.loggedInUser.id );
        // console.log(this.filteredStudents)
      }
    )
  }

  doSearch() {
    this.filteredStudents = this.students.filter(student => student.name.toLowerCase().startsWith(this.search.toLowerCase()));
  }

  checkStudent(student: ApplicationUserDto) {
    if (this.checked.has(student.id!)){
      this.checked.delete(student.id!);
    } else {
      this.checked.set(student.id!, student.name);
    }
    // console.log(this.checked);
  }
}
