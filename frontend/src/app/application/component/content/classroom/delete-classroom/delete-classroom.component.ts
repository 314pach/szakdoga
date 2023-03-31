import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomDto} from "../../../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../../../shared/service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";

@Component({
  selector: 'app-delete-classroom',
  templateUrl: './delete-classroom.component.html',
  styleUrls: ['./delete-classroom.component.scss']
})
export class DeleteClassroomComponent {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  constructor(
    private applicationUserService: ApplicationUserService,
    private classRoomService: ClassroomService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<DeleteClassroomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {classroom: ClassroomDto}
  ) {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).subscribe(
      user => this.loggedInUser = user
    );
  }

  delete() {
    this.classRoomService.deleteClassRoom(this.data.classroom.id!)
      .subscribe(_ =>
      {
        this.classRoomService.getClassRoomsByUser(this.loggedInUser.id!);
        this._snackBar.open(
          "Az osztály törlése sikeres",
          "Ok",
          {duration: 5000});
      });
    this.dialog.close();
  }
}
