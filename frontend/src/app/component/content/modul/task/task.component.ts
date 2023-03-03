import {Component} from '@angular/core';
import {ModulService} from "../../../../shared/service/modul.service";
import {ModulDto} from "../../../../shared/dto/modul.dto";
import {TaskDto} from "../../../../shared/dto/task.dto";
import {TaskService} from "../../../../shared/service/task.service";
import {filter, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateTaskComponent} from "./create-task/create-task.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  modul: ModulDto = {} as ModulDto;

  tasks: TaskDto[] = [];

  constructor(
    private modulService: ModulService,
    private taskService: TaskService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.modulService.getSelectedModulSubject()
      .pipe(
        filter(modul => !!modul && !!Object.keys(modul).length),
        switchMap(modul => {
          console.log(modul)
            this.modul = modul;
            this.taskService.getTasksByModulId(modul.id!);
            return this.taskService.tasksByModulIdSubject;
          }
        )
      )
      .subscribe(
        tasks => this.tasks = tasks
      );
  }


  create() {
    let dialogRef = this.dialog.open(
      CreateTaskComponent, {
        width: '600px',
        height: '600px',
        autoFocus: "first-tabbable"
      });
  }
}
