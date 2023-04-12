import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
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
import {Observable, switchMap} from "rxjs";
import {AttachmentDto} from "../../../../../../../shared/dto/attachment.dto";
import {AttachmentService} from "../../../../../../../shared/service/attachment.service";
import {AttachmentTypeEnum} from "../../../../../../../shared/enum/attachment-type.enum";
import {BadgeDto} from "../../../../../../../shared/dto/badge.dto";
import {BadgeService} from "../../../../../../../shared/service/badge.service";
import {FileWebService} from "../../../../../../../shared/service/api/file-web.service";
import {FormControl, Validators} from "@angular/forms";
import {HandinService} from "../../../../../../../shared/service/handin.service";
import {HandinDto} from "../../../../../../../shared/dto/handin.dto";
import {HandinByDateModel} from "../../../../../../../shared/model/handin-by-date-model";
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";
import {CommitmentStatusEnum} from "../../../../../../../shared/enum/commitment-status.enum";

@Component({
  selector: 'app-view-commitment',
  templateUrl: './view-commitment.component.html',
  styleUrls: ['./view-commitment.component.scss']
})
export class ViewCommitmentComponent implements OnInit{
  @ViewChild("drawer") drawer!: MatDrawer;
  mode: MatDrawerMode = "side";
  threshold: number = 800;

  showStatistics: boolean = true;
  sumOfPointsForModul: number = 0;

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  modul: ModulDto = {} as ModulDto;
  tasks: Map<number, TaskDto> = new Map<number, TaskDto>();
  commitments: CommitmentDto[] = [];
  sumOfPoints: number = 0;
  teams: Map<number, Map<number, string>> = new Map; // taskId, userId, name

  badges: BadgeDto[] = [];

  // attachments: AttachmentDto[] = [];
  links: AttachmentDto[] = [];
  files: AttachmentDto[] = [];
  filesArray: File[] = [];
  uploadFiles: boolean = false;
  handinControl: FormControl = new FormControl('', Validators.required);
  handinsByDate: HandinByDateModel[] = [];

  selectedCommitment: CommitmentDto = {} as CommitmentDto;

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private handinService: HandinService,
    private badgeService: BadgeService,
    private applicationUserService: ApplicationUserService,
    private commitmentService: CommitmentService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private fileWebService: FileWebService,
    private renderer: Renderer2
  ) {
    this.renderer.listen("window", "resize", this.setMenuMode);
    this.mode = this.getScreenWidth() >= this.threshold ? "side" : "over";
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!)
      .subscribe( user => this.loggedInUser = user);
    this.getSumOfPoints();
    this.commitmentService.commitmentsByModulSubject
      .pipe(
        switchMap(commitments => {
          this.commitments = commitments;
          let commitedTaskIds : number[] = [];
          this.sumOfPoints = 0;
          this.showStatistics = true;
          commitments.forEach(commitment => {
            this.sumOfPoints += commitment.points;
            if (commitment.status !== CommitmentStatusEnum.Scored) {
              this.showStatistics = false;
            }
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

  getSumOfPoints() {
    return this.route.queryParams
      .pipe(
        switchMap(params => {
          let modulId = params['modulId'];
          return this.modulService.getModulById(modulId);
        }),
        switchMap(modul => {
            this.modul = modul;
            this.taskService.getTasksByModulIdAndRefreshSubject(modul.id!);
            return this.taskService.getTasksByModulId(modul.id!);
          }
        )
      ).subscribe(tasks => {
        this.sumOfPointsForModul = 0;
        tasks.forEach(task => this.sumOfPointsForModul += task.points);
      });
  }

  view(commitment: CommitmentDto) {
    if (this.getScreenWidth() <= this.threshold){
      this.drawer.close();
    }
    this.filesArray = [];
    this.handinControl.setValue('');
    this.selectedCommitment = commitment;
    let uniqueDates: number[] = [];
    this.handinService.getHandinsByCommitmentId(commitment.id!)
      .subscribe(handins => {
        handins.forEach(handin => {
          uniqueDates.push(new Date(new Date(handin.timestamp).getFullYear(), new Date(handin.timestamp).getMonth(), new Date(handin.timestamp).getDate(), new Date(handin.timestamp).getHours(), new Date(handin.timestamp).getMinutes()).getTime());
        });
        uniqueDates = [...new Set(uniqueDates)];
        uniqueDates.sort();
        console.log(uniqueDates)
        this.handinsByDate = [];
        uniqueDates.forEach(date => {
          let handinsByDate : HandinByDateModel = {
            date: new Date(date),
            handins: handins.filter(handin => date === new Date(new Date(handin.timestamp).getFullYear(), new Date(handin.timestamp).getMonth(), new Date(handin.timestamp).getDate(), new Date(handin.timestamp).getHours(), new Date(handin.timestamp).getMinutes()).getTime())
          }
          this.handinsByDate.push(handinsByDate);
        });
        console.log(this.handinsByDate);
      });
    this.attachmentService.getAttachmentByTaskId(commitment.taskId)
      .subscribe(attachments => {
        this.links = attachments.filter(a => a.type === AttachmentTypeEnum.LINK);
        this.files = attachments.filter(a => a.type === AttachmentTypeEnum.FILE);
      });
    this.badgeService.getBadgesByIds(commitment.badgeIds)
      .subscribe(badges => this.badges = badges);
  }

  getUsers(taskId: number) : string[]{
    return Array.from(this.teams.get(taskId)!.values());
  }

  downloadFile(fileId: number, fileName: string): void {
    this.fileWebService.getFile(fileId).subscribe(file => {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(file);
      elem.download = fileName;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    });
  }

  checkUploadFiles() {
    this.uploadFiles = true;
  }

  removeFileUpload() {
    this.uploadFiles = false;
  }

  fileSelectionChanged($event: any) {
    if ($event.target) {
      this.filesArray = $event.target.files;
    }
  }

  isDisabled() {
    return this.handinControl.invalid;
  }

  save() {
    if (!this.isDisabled()){
      let i = 0;
      Array.from(this.filesArray).forEach(input => {
        this.fileWebService.uploadFile(input)
          .pipe(
            switchMap(id => {
              let file = new HandinDto(
                null,
                input.name,
                new Date(),
                id,
                this.selectedCommitment.id!,
                this.loggedInUser.id!
              );
              return this.handinService.createHandin(file);
            }))
          .subscribe(_ => {
            console.log("siker");
            i++;
            if (i === this.filesArray.length){
              this.view(this.selectedCommitment);
              this.removeFileUpload();
            }
          });
      });
    }
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  setMenuMode = (e: Event) => {
    if (this.getScreenWidth() >= this.threshold){
      if (this.mode === "over"){
        this.drawer.open();
      }
      this.mode = "side";
    } else {
      if (this.mode === "side"){
        this.drawer.close();
      }
      this.mode = "over"
    }
  }

  showResult(){
    return this.selectedCommitment.status === CommitmentStatusEnum.Scored;
  }

  getGrade() {
    if (this.sumOfPoints < this.modul.pointsFor2) {
      return 1;
    } else if (this.sumOfPoints < this.modul.pointsFor3) {
      return 2;
    } else if (this.sumOfPoints < this.modul.pointsFor4) {
      return 3;
    } else if (this.sumOfPoints < this.modul.pointsFor5) {
      return 4;
    } else {
      return 5;
    }
    // console.log(this.placeholder)
  }
}
