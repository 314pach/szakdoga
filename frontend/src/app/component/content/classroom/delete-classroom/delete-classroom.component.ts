import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomDto} from "../../../../shared/dto/classroom.dto";
import {ClassroomService} from "../../../../shared/service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-classroom',
  templateUrl: './delete-classroom.component.html',
  styleUrls: ['./delete-classroom.component.scss']
})
export class DeleteClassroomComponent {
  constructor(
    private classRoomService: ClassroomService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<DeleteClassroomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {classroom: ClassroomDto}
  ) {
  }

  delete() {
    this.classRoomService.deleteClassRoom(this.data.classroom.id!)
      .subscribe(_ =>
      {
        this.classRoomService.getAllClassRooms();
        this._snackBar.open(
          "Az osztály törlése sikeres",
          "Ok",
          {duration: 5000});
      });
    this.dialog.close();
  }
}
