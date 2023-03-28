import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModulDto} from "../../../../shared/dto/modul.dto";
import {ModulService} from "../../../../shared/service/modul.service";
import {CreateModulComponent} from "./create-modul/create-modul.component";
import {DeleteModulComponent} from "./delete-modul/delete-modul.component";
import {UpdateModulComponent} from "./update-modul/update-modul.component";
import {convertToParamMap, Router} from "@angular/router";
import {ApplicationUserDto} from "../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../shared/service/application-user.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.scss']
})
export class ModulComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  moduls: ModulDto[] = [];

  constructor(
    private modulService: ModulService,
    private applicationUserService: ApplicationUserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    // this.refreshData();
    this.modulService.allModulsSubject.subscribe(
      moduls => {
        this.moduls = moduls;
        console.log(this.moduls);
      }
    );
  }

  refreshData(){
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

  ngOnInit(): void {
    this.refreshData();
  }

  create() {
    let dialogRef = this.dialog.open(
      CreateModulComponent, {
        width: '600px',
        height: '600px',
        autoFocus: "first-tabbable"
      });
  }

  update(modul: ModulDto) {
    let dialogRef = this.dialog.open(
      UpdateModulComponent, {
        width: '600px',
        height: '600px',
        autoFocus: "first-tabbable",
        data: {modul: modul}
      });
  }

  delete(modul: ModulDto) {
    let dialogRef = this.dialog.open(
      DeleteModulComponent, {
        width: '600px',
        maxHeight: '500px',
        data: {modul: modul}
      });
  }

  open(modul: ModulDto) {
    this.router.navigate(["modul/task"], {queryParams: {modulId: modul.id}});
  }
}
