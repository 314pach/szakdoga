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
    this.modulService.deleteModul(this.data.modul.id!)
      .subscribe(_ =>
      {
        this.modulService.getAllModuls();
        this._snackBar.open(
          "A témakör törlése sikeres",
          "Ok",
          {duration: 5000});
      });
    this.dialog.close();
  }
}
