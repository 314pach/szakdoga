import {Component, Inject} from '@angular/core';
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {ModulService} from "../../../../../shared/service/modul.service";
import {switchMap} from "rxjs";
import {ModulDto} from "../../../../../shared/dto/modul.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomDto} from "../../../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../../../shared/service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-learns',
  templateUrl: './edit-learns.component.html',
  styleUrls: ['./edit-learns.component.scss']
})
export class EditLearnsComponent {
  moduls: ModulDto[] = [];
  checked: number[] = [];
  constructor(
    private applicationUserService: ApplicationUserService,
    private modulService: ModulService,
    private classroomService: ClassroomService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<EditLearnsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {classroom: ClassroomDto}

  ) {
    this.checked = [...this.data.classroom.modulIds];
    this.applicationUserService.loggedInUserSubject
      .pipe(
        switchMap(loggedInUser => {
            return this.modulService.getModulsByCreator(loggedInUser.id!);
          }
        )
      )
      .subscribe(
        moduls => {
          this.moduls = moduls;
        }
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
    return this.arraysEquals(this.checked.sort(), this.data.classroom.modulIds.sort());
  }

  save() {
    if (!this.isDisabled()){
      let classroom = new ClassroomDto(
        this.data.classroom.id,
        this.data.classroom.name,
        this.data.classroom.subject,
        this.data.classroom.archived,
        this.checked,
        this.data.classroom.applicationUserIds
      )
      this.classroomService.updateClassRoom(classroom)
        .subscribe(
          classroom => {
            this._snackBar.open(
              "A(z) " + classroom.name + " " + classroom.subject + " osztály módosítása sikeres",
              "Ok",
              {duration: 5000}
            );
          }
        );
      this.dialog.close("saved");
    }
  }

  checkModul(modulId: number) {
    if (this.checked.includes(modulId)){
      this.checked = this.checked.filter(id => id !== modulId);
    } else {
      this.checked.push(modulId);
    }
  }
}
