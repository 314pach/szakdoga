import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {filter, forkJoin} from "rxjs";
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
import {MatDialog} from "@angular/material/dialog";
import {AssembleTeamComponent} from "./assemble-team/assemble-team.component";
import {ClassroomDto} from "../../../../../../shared/dto/classroom.dto";

@Component({
  selector: 'app-create-commitment',
  templateUrl: './create-commitment.component.html',
  styleUrls: ['./create-commitment.component.scss']
})
export class CreateCommitmentComponent implements OnInit, AfterViewInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  modul: ModulDto = {} as ModulDto;
  classroom: ClassroomDto = {} as ClassroomDto;
  tasks: TaskDto[] = [];
  available: TaskDto[] = [];
  commited: TaskDto[] = [];
  commitments: CommitmentDto[] = [];
  commitedTaskIds: number[] = [];
  teams: Map<number, Map<number, string>> = new Map; // taskId, userId, name
  changedTeams: Map<number, Map<number, string>> = new Map; // taskId, userId, name

  tasksToAdd: number[] = [];
  tasksToRemove: number[] = [];

  sumOfPoints: number = 0;
  expectedGrade: number = 1;
  placeholder: number[] = [0];

  @ViewChild("save_btn") saveButton!: MatButton;

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private applicationUserService: ApplicationUserService,
    private commitmentService: CommitmentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
    this.route.queryParams
      .subscribe(params => {
        let modulId = params['modulId'];
        let classroomId = params['classroomId'];
        this.modulService.getModulById(modulId)
          .subscribe(
            modul => this.modul = modul
          );
        this.classroomService.getClassroomById(classroomId)
          .subscribe(
            classroom => this.classroom = classroom
          );
      });
  }

  refreshData() {
    this.applicationUserService.loggedInUserSubject
      .subscribe(user => this.loggedInUser = user);
    combineLatest(
      this.taskService.tasksByModulIdSubject,
      this.commitmentService.commitmentsByModulSubject
    ).subscribe(
      data => {
        if (data[0].length && data[1].length) {
          // console.log(data)
          this.tasks = data[0];
          this.commitments = data[1];
          this.commitedTaskIds = [];
          data[1].forEach(commitment => {
            this.commitedTaskIds.push(commitment.taskId)
            this.applicationUserService.getUsersByIds(commitment.studentIds)
              .subscribe(users => {
                let team: Map<number, string> = new Map;
                let changedTeam: Map<number, string> = new Map;
                users.forEach(u => {
                  team.set(u.id!, u.name);
                  changedTeam.set(u.id!, u.name);
                });
                this.teams.set(commitment.taskId, team);
                this.changedTeams.set(commitment.taskId, changedTeam);
              });
          });
          this.available = data[0].filter(task => !this.commitedTaskIds.includes(task.id!));
          this.sumOfPoints = 0;
          this.commited = data[0].filter(task => this.commitedTaskIds.includes(task.id!));
          this.commited.forEach(task => this.sumOfPoints += task.points);
          this.refreshGrade();
        }
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
    // console.log(this.placeholder)
  }

  add(task: TaskDto) {
    this.commited.push(task);
    this.available = this.available.filter(t => t.id !== task.id);
    this.sumOfPoints += task.points;
    this.refreshGrade();
    if (!this.commitedTaskIds.includes(task.id!)) {
      this.tasksToAdd.push(task.id!);
      this.changedTeams.set(task.id!, new Map()) //todo check
      this.changedTeams.get(task.id!)!.set(this.loggedInUser.id!, this.loggedInUser.name)
    } else {
      this.tasksToRemove = this.tasksToRemove.filter(taskId => taskId !== task.id);
    }
    // console.log(this.tasksToAdd);
    // console.log(this.tasksToRemove);
  }

  remove(task: TaskDto) {
    this.available.push(task);
    this.commited = this.commited.filter(t => t.id !== task.id);
    this.sumOfPoints -= task.points;
    this.refreshGrade();
    if (this.commitedTaskIds.includes(task.id!)) {
      this.tasksToRemove.push(task.id!);
    } else {
      this.tasksToAdd = this.tasksToAdd.filter(taskId => taskId !== task.id);
    }
    // console.log(this.tasksToAdd);
    // console.log(this.tasksToRemove);
  }

  arraysEquals(a: number[], b: number[]): boolean {
    // console.log(a);
    // console.log(b);
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  isDisabled() {
    let currentlyCommited: number[] = [];
    this.commited.forEach(task => currentlyCommited.push(task.id!));

    let headcountError = false;
    // console.log(this.tasks);
    currentlyCommited.forEach(taskId => {
      let task: TaskDto = this.tasks.filter(t => t.id === taskId)[0];
      if (this.changedTeams.get(taskId) && task.headcount !== this.changedTeams.get(taskId)!.size) {
        headcountError = true;
      }
    });
    if (headcountError) {
      return true;
    }

    for (let task of this.changedTeams.keys()) {
      if (!this.arraysEquals(Array.from(this.teams.get(task)!.keys()), Array.from(this.changedTeams.get(task)!.keys()))) {
        return false;
      }
    }

    // console.log("currently commited: " + currentlyCommited)
    // console.log("db: " + this.commitedTaskIds)
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
          data => {
            // console.log("hallo")
            // console.log(data)
            this._snackBar.open(
              "A vállalás sikeres",
              "Ok",
              {duration: 5000}
            );
            let alltasks: number[] = [];
            this.tasks.forEach(t => alltasks.push(t.id!));
            this.commitmentService.getCommitmentsByUserAndModul(this.loggedInUser.id!, alltasks);
            this.refreshData();
          }
        );
    }
  }

  deleteCommitments() {
    let commitmentIds: number[] = [];
    if (this.tasksToRemove.length) {
      this.commitments.forEach(commitment => {
        if (this.tasksToRemove.includes(commitment.taskId)) {
          commitmentIds.push(commitment.id!);
        }
      });
    }
    return this.commitmentService.deleteCommitments(commitmentIds);
  }

  createCommitments() {
    let commitments: CommitmentDto[] = [];
    if (this.tasksToAdd.length) {
      this.tasksToAdd.forEach(taskId => {
        let members: number[] = [...this.changedTeams.get(taskId)!.keys()];
        // console.log(members);
        let newCommitment;
        if (this.commitedTaskIds.includes(taskId)) {
          let id = this.commitments.filter(c => c.taskId === taskId)[0].id;
          newCommitment = new CommitmentDto(
            id,
            0,
            CommitmentStatusEnum.Created,
            this.modul.end,
            taskId,
            // [this.loggedInUser.id!],
            members,
            []
          );
        } else {
          newCommitment = new CommitmentDto(
            null,
            0,
            CommitmentStatusEnum.Created,
            this.modul.end,
            taskId,
            // [this.loggedInUser.id!],
            members,
            []
          );
        }
        commitments.push(newCommitment);
      });
    }
    return this.commitmentService.createCommitments(commitments);
    //todo batch update to look better on backend
  }

  getColor() {
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

  assemble(task: TaskDto) {
    let dialogRef = this.dialog.open(
      AssembleTeamComponent, {
        width: '600px',
        maxHeight: '500px',
        data: {
          classroomId: this.classroom.id,
          headcount: task.headcount,
          members: this.changedTeams.get(task.id!)
        }
      });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result instanceof Map) {
          // console.log(result);
          this.changedTeams.set(task.id!, result);
          if ((!this.teams.has(task.id!) || !this.arraysEquals(Array.from(this.teams.get(task.id!)!.keys()), Array.from(this.changedTeams.get(task.id!)!.keys()))) && !this.tasksToAdd.includes(task.id!)) {
            this.tasksToAdd.push(task.id!);
          }
        }
      })
  }

  getUsers(taskId: number): string[] {
    if (this.changedTeams.get(taskId)) {
      return Array.from(this.changedTeams.get(taskId)!.values());
    } else {
      return [];
    }
  }
}
