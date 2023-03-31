import {Component, OnInit} from '@angular/core';
import {ModulDto} from "../../../../../shared/dto/modul.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {ClassroomDto} from "../../../../../shared/dto/classroom.dto";
import {ModulService} from "../../../../../shared/service/modul.service";
import {ClassroomService} from "../../../../../shared/service/classroom.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditLearnsComponent} from "./edit-learns/edit-learns.component";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {RoleEnum} from "../../../../../shared/enum/role.enum";

@Component({
  selector: 'app-learns',
  templateUrl: './learns.component.html',
  styleUrls: ['./learns.component.scss']
})
export class LearnsComponent implements OnInit {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  classroom: ClassroomDto = {} as ClassroomDto;
  moduls: ModulDto[] = [];
  isTeacher: boolean = false;

  constructor(
    private applicationUserService: ApplicationUserService,
    private modulService: ModulService,
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  refreshData() {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).subscribe(user => {
      // console.log(user);
      this.loggedInUser = user;
      this.isTeacher = (user.role === RoleEnum.TEACHER);
    })
    this.route.queryParams.subscribe(params => {
      let classroomId = params['classroomId'];
      this.classroomService.getClassroomById(classroomId)
        .pipe(
          switchMap(classroom => {
              this.classroom = classroom;
              return this.modulService.getModulsByIds(classroom.modulIds);
            }
          )
        )
        .subscribe(
          moduls => {
            this.moduls = moduls;
          }
        );
    });
  }

  ngOnInit() {
    this.refreshData();
  }

  open(modul: any) {
    this.router.navigate(["classroom/modul/commitment"], {queryParams: {classroomId: this.classroom.id, modulId: modul.id}});
  }

  edit() {
    let dialogRef = this.dialog.open(
      EditLearnsComponent, {
        width: '600px',
        height: '400px',
        data: {classroom: this.classroom}
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "saved") {
        this.refreshData();
      }
    });
  }
}
