import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {ModulDto} from "../../../../../shared/dto/modul.dto";
import {ModulService} from "../../../../../shared/service/modul.service";

@Component({
  selector: 'app-create-modul',
  templateUrl: './create-modul.component.html',
  styleUrls: ['./create-modul.component.scss']
})
export class CreateModulComponent {
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
    private dialog: MatDialogRef<CreateModulComponent>,
    private applicationUserService: ApplicationUserService,
    private _snackBar: MatSnackBar
  ) {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).subscribe(
      user => this.loggedInUser = user
    );
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  isDisabled() {
    return this.titleControl.invalid
      || this.dateControl1.invalid
      || this.dateControl2.invalid
      || this.grade2Control.invalid
      || this.grade3Control.invalid
      || this.grade5Control.invalid;
  }

  save() {
    if (!this.isDisabled()){
      let modul = new ModulDto(
        null,
        this.titleControl.value,
        this.dateControl1.value,
        this.dateControl2.value,
        this.grade2Control.value,
        this.grade3Control.value,
        this.grade4Control.value,
        this.grade5Control.value,
        "",
        this.loggedInUser.id!,
        []
      );
      this.modulService.createModul(modul)
        .subscribe(
          modul => {
            this._snackBar.open(
              "A(z) " + modul.title + " témakör létrehozása sikeres",
              "Ok",
              {duration: 5000}
            );
            this.modulService.getAllModuls();
          }
        );
      this.dialog.close();
    }
  }
}
