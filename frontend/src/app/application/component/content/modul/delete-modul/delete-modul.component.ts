import {Component, Inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModulService} from "../../../../../shared/service/modul.service";
import {ModulDto} from "../../../../../shared/dto/modul.dto";

@Component({
  selector: 'app-delete-modul',
  templateUrl: './delete-modul.component.html',
  styleUrls: ['./delete-modul.component.scss']
})
export class DeleteModulComponent {
  constructor(
    private modulService: ModulService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<DeleteModulComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {modul: ModulDto}
  ) {
  }

  delete() {
    let modul = new ModulDto(
      this.data.modul.id,
      true,
      this.data.modul.title,
      this.data.modul.beginning,
      this.data.modul.end,
      this.data.modul.pointsFor2,
      this.data.modul.pointsFor3,
      this.data.modul.pointsFor4,
      this.data.modul.pointsFor5,
      this.data.modul.bannerPath,
      this.data.modul.creatorId,
      this.data.modul.classRoomIds
    );
    this.modulService.updateModul(modul)
      .subscribe(_ =>
      {
        this._snackBar.open(
          "A témakör törlése sikeres",
          "Ok",
          {duration: 5000});
      });
    this.dialog.close();
  }
}
