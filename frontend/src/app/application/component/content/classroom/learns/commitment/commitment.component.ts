import {Component} from '@angular/core';
import {ClassroomDto} from "../../../../../../shared/dto/classroom.dto";
import {ModulDto} from "../../../../../../shared/dto/modul.dto";
import {ClassroomService} from "../../../../../../shared/service/classroom.service";
import {ModulService} from "../../../../../../shared/service/modul.service";
import {combineLatest, Observable, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CommitmentService} from "../../../../../../shared/service/commitment.service";
import {ApplicationUserService} from "../../../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../../../shared/dto/application-user.dto";
import {TaskService} from "../../../../../../shared/service/task.service";
import {TaskDto} from "../../../../../../shared/dto/task.dto";

@Component({
  selector: 'app-commitment',
  templateUrl: './commitment.component.html',
  styleUrls: ['./commitment.component.scss']
})
export class CommitmentComponent {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  classroom: ClassroomDto = {} as ClassroomDto;
  modul: ModulDto = {} as ModulDto;

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private commitmentService: CommitmentService,
    private applicationUserService: ApplicationUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    combineLatest(
        this.getTasks(),
        this.getUser()
    ).subscribe(
      data => {
        let taskIds: number [] = []
        data[0].forEach(task => taskIds.push(task.id!));
        this.commitmentService.getCommitmentsByUserAndModul(data[1].id!, taskIds)
      }
    )
  }

  getTasks(): Observable<TaskDto[]> {
    return this.route.queryParams
      .pipe(
        switchMap(params => {
          let classroomId = params['classroomId'];
          let modulId = params['modulId'];
          this.classroomService.getClassroomById(classroomId)
            .subscribe(
              classroom => this.classroom = classroom
            );
          return this.modulService.getModulById(modulId);
        }),
        switchMap(modul => {
            this.modul = modul;
            this.taskService.getTasksByModulIdAndRefreshSubject(modul.id!);
            return this.taskService.getTasksByModulId(modul.id!);
          }
        )
      );
  }

  getUser(): Observable<ApplicationUserDto> {
    return this.applicationUserService.loggedInUserSubject;
  }

  navigate() {
    this.router.navigate(["classroom/modul"], {queryParams: {classroomId: this.classroom.id}});
  }
}
