import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {forkJoin} from "rxjs";
import {ClassroomService} from "../../../../../../shared/service/classroom.service";
import {ApplicationUserService} from "../../../../../../shared/service/application-user.service";
import {ModulService} from "../../../../../../shared/service/modul.service";
import {TaskService} from "../../../../../../shared/service/task.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModulDto} from "../../../../../../shared/dto/modul.dto";
import {TaskDto} from "../../../../../../shared/dto/task.dto";
import {CommitmentDto} from "../../../../../../shared/dto/commitment.dto";
import {ApplicationUserDto} from "../../../../../../shared/dto/application-user.dto";
import {CommitmentService} from "../../../../../../shared/service/commitment.service";
import {combineLatest} from "rxjs";
import {CommitmentStatusEnum} from "../../../../../../shared/enum/commitment-status.enum";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-commitment',
  templateUrl: './create-commitment.component.html',
  styleUrls: ['./create-commitment.component.scss']
})
export class CreateCommitmentComponent implements OnInit, AfterViewInit{
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  modul: ModulDto = {} as ModulDto;
  tasks: TaskDto[] = [];
  available: TaskDto[] = [];
  commited: TaskDto[] = [];
  commitments: CommitmentDto[] = [];
  commitedTaskIds: number[] = [];

  tasksToAdd: number[] = [];
  tasksToRemove: number[] = [];

  sumOfPoints: number = 0;
  expectedGrade: number = 1;
  placeholder: number[] = [0];

  @ViewChild("save_btn") saveButton! : MatButton;

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private applicationUserService: ApplicationUserService,
    private commitmentService: CommitmentService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
  }
  ngOnInit(): void {
    this.refreshData();
    this.route.queryParams
      .subscribe(params => {
          let modulId = params['modulId'];
          this.modulService.getModulById(modulId)
            .subscribe(
              modul => this.modul = modul
            );
      });
  }

  refreshData() {
    this.applicationUserService.loggedInUserSubject
      .subscribe( user => this.loggedInUser = user);
    combineLatest(
      this.taskService.tasksByModulIdSubject,
      this.commitmentService.commitmentsByModulSubject
    ).subscribe(
      data => {
        this.tasks = data[0];
        this.commitments = data[1];
        this.commitedTaskIds = [];
        data[1].forEach(commitment => this.commitedTaskIds.push(commitment.taskId));
        this.available = data[0].filter(task => !this.commitedTaskIds.includes(task.id!));
        this.sumOfPoints = 0;
        this.commited = data[0].filter(task => this.commitedTaskIds.includes(task.id!));
        this.commited.forEach(task => this.sumOfPoints += task.points);
        this.refreshGrade();
      }
    )
  }

  refreshGrade() {
    if (this.sumOfPoints < this.modul.pointsFor2) {
      this.expectedGrade = 1;
      this.placeholder = [0];
    } else if (this.sumOfPoints < this.modul.pointsFor3) {
      this.expectedGrade = 2;
      this.placeholder = [0, 0];
    } else if (this.sumOfPoints < this.modul.pointsFor4) {
      this.expectedGrade = 3;
      this.placeholder = [0, 0, 0];
    } else if (this.sumOfPoints < this.modul.pointsFor5) {
      this.expectedGrade = 4;
      this.placeholder = [0, 0, 0, 0];
    } else {
      this.expectedGrade = 5;
      this.placeholder = [0, 0, 0, 0, 0];
    }
    console.log(this.placeholder)
  }

  add(task: TaskDto) {
    this.commited.push(task);
    this.available = this.available.filter(t => t.id !== task.id);
    this.sumOfPoints += task.points;
    this.refreshGrade();
    if (!this.commitedTaskIds.includes(task.id!)){
      this.tasksToAdd.push(task.id!);
    } else {
      this.tasksToRemove = this.tasksToRemove.filter(taskId => taskId !== task.id);
    }
    console.log(this.tasksToAdd);
    console.log(this.tasksToRemove);
  }

  remove(task: TaskDto) {
    this.available.push(task);
    this.commited = this.commited.filter(t => t.id !== task.id);
    this.sumOfPoints -= task.points;
    this.refreshGrade();
    if (this.commitedTaskIds.includes(task.id!)){
      this.tasksToRemove.push(task.id!);
    } else {
      this.tasksToAdd = this.tasksToAdd.filter(taskId => taskId !== task.id);
    }
    console.log(this.tasksToAdd);
    console.log(this.tasksToRemove);
  }

  arraysEquals(a: number[], b:  number[]): boolean{
    // console.log(a);
    // console.log(b);
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  isDisabled() {
    let currentlyCommited : number[] = [];
    this.commited.forEach(task => currentlyCommited.push(task.id!));
    console.log("currently commited: " + currentlyCommited)
    console.log("db: " + this.commitedTaskIds)
    return this.commitedTaskIds.length === currentlyCommited.length && this.arraysEquals(this.commitedTaskIds.sort(), currentlyCommited.sort());
  }

  save() {
    if (!this.isDisabled()) {
      forkJoin(
        [
          this.deleteCommitments(),
          this.createCommitments()
        ]
      )
        .subscribe(
          _ => {
            this._snackBar.open(
              "A vállalás sikeres",
              "Ok",
              {duration: 5000}
            );
            this.refreshData();
          }
        );
    }
  }

  deleteCommitments(){
    let commitmentIds : number[] = [];
    if (this.tasksToRemove.length) {
      this.commitments.forEach(commitment => {
        if (this.tasksToRemove.includes(commitment.taskId)){
          commitmentIds.push(commitment.id!);
        }
      });
    }
    return this.commitmentService.deleteCommitments(commitmentIds);
  }

  createCommitments(){
    let commitments : CommitmentDto[] = [];
    if (this.tasksToAdd.length) {
      this.tasksToAdd.forEach(taskId => {
        let newCommitment = new CommitmentDto(
          null,
          0,
          CommitmentStatusEnum.Created,
          this.modul.end,
          taskId,
          [this.loggedInUser.id!],
          []
        );
        commitments.push(newCommitment);
      });
    }
    return this.commitmentService.createCommitments(commitments);
  }

  getColor(){
    //todo better colors
    switch (this.expectedGrade) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "blue";
      case 5:
        return "green";
      default:
        return "black";
    }
  }

  ngAfterViewInit(): void {
    this.saveButton.disabled = true;
  }
}
