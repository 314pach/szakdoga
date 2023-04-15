import {Component, Inject} from '@angular/core';
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {FormControl, Validators} from "@angular/forms";
import {ModulService} from "../../../../../shared/service/modul.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModulDto} from "../../../../../shared/dto/modul.dto";

@Component({
  selector: 'app-update-modul',
  templateUrl: './update-modul.component.html',
  styleUrls: ['./update-modul.component.scss']
})
export class UpdateModulComponent {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  titleControl: FormControl = new FormControl<string>("", Validators.required);
  dateControl1: FormControl = new FormControl<Date>(new Date(), Validators.required);
  dateControl2: FormControl = new FormControl<Date>(new Date(), Validators.required);
  grade2Control: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  grade3Control: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  grade4Control: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  grade5Control: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  constructor(
    private modulService: ModulService,
    private dialog: MatDialogRef<UpdateModulComponent>,
    private applicationUserService: ApplicationUserService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {modul: ModulDto}
  ) {
    this.titleControl.setValue(this.data.modul.title);
    this.dateControl1.setValue(this.data.modul.beginning);
    this.dateControl2.setValue(this.data.modul.end);
    this.grade2Control.setValue(this.data.modul.pointsFor2);
    this.grade3Control.setValue(this.data.modul.pointsFor3);
    this.grade4Control.setValue(this.data.modul.pointsFor4);
    this.grade5Control.setValue(this.data.modul.pointsFor5);
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).subscribe(
      user => this.loggedInUser = user
    );
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  isDisabled() {
    if (
         this.titleControl.invalid
      || this.dateControl1.invalid
      || this.dateControl2.invalid
      || this.grade2Control.invalid
      || this.grade3Control.invalid
      || this.grade5Control.invalid)
    {
      return true;
    }
    return this.titleControl.value === this.data.modul.title
      &&
      new Date(
        new Date(this.dateControl1.value).getFullYear(),
        new Date(this.dateControl1.value).getMonth(),
        new Date(this.dateControl1.value).getDay()
      ).getTime()
      ===
      new Date(
        new Date(this.data.modul.beginning).getFullYear(),
        new Date(this.data.modul.beginning).getMonth(),
        new Date(this.data.modul.beginning).getDay(),
      ).getTime()
      &&
      new Date(
        new Date(this.dateControl2.value).getFullYear(),
        new Date(this.dateControl2.value).getMonth(),
        new Date(this.dateControl2.value).getDay(),
      ).getTime()
      ===
      new Date(
        new Date(this.data.modul.end).getFullYear(),
        new Date(this.data.modul.end).getMonth(),
        new Date(this.data.modul.end).getDay(),
      ).getTime()
      && this.grade2Control.value === this.data.modul.pointsFor2
      && this.grade3Control.value === this.data.modul.pointsFor3
      && this.grade4Control.value === this.data.modul.pointsFor4
      && this.grade5Control.value === this.data.modul.pointsFor5
  }

  update() {
    if (!this.isDisabled()){
      let modul = new ModulDto(
        this.data.modul.id,
        false,
        this.titleControl.value,
        this.dateControl1.value,
        this.dateControl2.value,
        this.grade2Control.value,
        this.grade3Control.value,
        this.grade4Control.value,
        this.grade5Control.value,
        this.data.modul.bannerPath,
        this.data.modul.creatorId,
        this.data.modul.classRoomIds
      );
      this.modulService.updateModul(modul)
        .subscribe(
          modul => {
            this._snackBar.open(
              "A(z) " + modul.title + " témakör módosítása sikeres",
              "Ok",
              {duration: 5000}
            );
          }
        );
      this.dialog.close();
    }
  }
}
