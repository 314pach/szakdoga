import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModulService} from "../../../../shared/service/modul.service";
import {ModulDto} from "../../../../shared/dto/modul.dto";
import {TaskDto} from "../../../../shared/dto/task.dto";
import {TaskService} from "../../../../shared/service/task.service";
import {switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateTaskComponent} from "./create-task/create-task.component";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {DeleteTaskComponent} from "./delete-task/delete-task.component";
import {UpdateTaskComponent} from "./update-task/update-task.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit{
  modul: ModulDto = {} as ModulDto;

  tasks: TaskDto[] = [];

  columnsToDisplay = ['title', 'points', 'actions'];
  dataSource : MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private modulService: ModulService,
    private taskService: TaskService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
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
            this.dataSource.data = this.tasks;
          }
        );
    });
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }

      return data[sortHeaderId];
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  create() {
    let dialogRef = this.dialog.open(
      CreateTaskComponent, {
        width: '600px',
        height: '600px',
        autoFocus: "first-tabbable",
        data: {modulId: this.modul.id}
      });
  }

  update(task: TaskDto) {
    let dialogRef = this.dialog.open(
      UpdateTaskComponent, {
        width: '600px',
        height: '600px',
        autoFocus: "first-tabbable",
        data: {task: task, modulId: this.modul.id}
      });
  }

  delete(task: TaskDto) {
    let dialogRef = this.dialog.open(
      DeleteTaskComponent, {
        width: '600px',
        maxHeight: '500px',
        data: {task: task, modulId: this.modul.id}
      });
  }
}
