import {Component, OnInit} from '@angular/core';
import {ClassroomService} from "../../../../../../../shared/service/classroom.service";
import {ModulService} from "../../../../../../../shared/service/modul.service";
import {TaskService} from "../../../../../../../shared/service/task.service";
import {ApplicationUserService} from "../../../../../../../shared/service/application-user.service";
import {CommitmentService} from "../../../../../../../shared/service/commitment.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplicationUserDto} from "../../../../../../../shared/dto/application-user.dto";
import {ModulDto} from "../../../../../../../shared/dto/modul.dto";
import {TaskDto} from "../../../../../../../shared/dto/task.dto";
import {CommitmentDto} from "../../../../../../../shared/dto/commitment.dto";
import {switchMap} from "rxjs";
import {AttachmentDto} from "../../../../../../../shared/dto/attachment.dto";
import {AttachmentService} from "../../../../../../../shared/service/attachment.service";
import {AttachmentTypeEnum} from "../../../../../../../shared/enum/attachment-type.enum";

@Component({
  selector: 'app-view-commitment',
  templateUrl: './view-commitment.component.html',
  styleUrls: ['./view-commitment.component.scss']
})
export class ViewCommitmentComponent implements OnInit{

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  modul: ModulDto = {} as ModulDto;
  tasks: Map<number, TaskDto> = new Map<number, TaskDto>();
  commitments: CommitmentDto[] = [];
  teams: Map<number, Map<number, string>> = new Map; // taskId, userId, name

  // attachments: AttachmentDto[] = [];
  links: AttachmentDto[] = [];
  files: AttachmentDto[] = [];

  selectedCommitment: CommitmentDto = {} as CommitmentDto;

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private applicationUserService: ApplicationUserService,
    private commitmentService: CommitmentService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.applicationUserService.loggedInUserSubject
      .subscribe( user => this.loggedInUser = user);
    this.commitmentService.commitmentsByModulSubject
      .pipe(
        switchMap(commitments => {
          this.commitments = commitments;
          let commitedTaskIds : number[] = [];
          commitments.forEach(commitment => {
            commitedTaskIds.push(commitment.taskId)
            this.applicationUserService.getUsersByIds(commitment.studentIds)
              .subscribe(users => {
                let team: Map<number, string> = new Map;
                users.forEach(u => team.set(u.id!, u.name));
                this.teams.set(commitment.taskId, team);
              });
          });
          return this.taskService.getTasksByIds(commitedTaskIds);
        })
      )
      .subscribe(tasks => tasks.forEach(task => this.tasks.set(task.id!, task)));
  }

  view(commitment: CommitmentDto) {
    this.selectedCommitment = commitment;
    this.attachmentService.getAttachmentByTaskId(commitment.taskId)
      .subscribe(attachments => {
        this.links = attachments.filter(a => a.type === AttachmentTypeEnum.LINK);
        this.files = attachments.filter(a => a.type === AttachmentTypeEnum.FILE);
      });
  }

  getUsers(taskId: number) : string[]{
    return Array.from(this.teams.get(taskId)!.values());
  }
}
