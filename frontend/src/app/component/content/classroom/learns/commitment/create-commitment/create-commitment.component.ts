import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs";
import {ClassroomService} from "../../../../../../shared/service/classroom.service";
import {ApplicationUserService} from "../../../../../../shared/service/application-user.service";
import {ModulService} from "../../../../../../shared/service/modul.service";
import {TaskService} from "../../../../../../shared/service/task.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModulDto} from "../../../../../../shared/dto/modul.dto";
import {TaskDto} from "../../../../../../shared/dto/task.dto";

@Component({
  selector: 'app-create-commitment',
  templateUrl: './create-commitment.component.html',
  styleUrls: ['./create-commitment.component.scss']
})
export class CreateCommitmentComponent implements OnInit{
  modul: ModulDto = {} as ModulDto;
  tasks: TaskDto[] = [];

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private applicationUserService: ApplicationUserService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let classroomId = params['classroomId'];
      let modulId = params['modulId'];
      this.modulService.getModulById(modulId)
        .pipe(
          switchMap(modul => {
              this.modul = modul;
              this.taskService.getTasksByModulId(modul.id!);
              return this.taskService.tasksByModulIdSubject;
            }
          )
        )
        .subscribe(
          tasks => {
            this.tasks = tasks;
            console.log(this.tasks);
          }
        );
    });
  }

}
