import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApplicationUserDto} from "../../../../../../shared/dto/application-user.dto";
import {ClassroomDto} from "../../../../../../shared/dto/classroom.dto";
import {ModulDto} from "../../../../../../shared/dto/modul.dto";
import {ClassroomService} from "../../../../../../shared/service/classroom.service";
import {ModulService} from "../../../../../../shared/service/modul.service";
import {TaskService} from "../../../../../../shared/service/task.service";
import {CommitmentService} from "../../../../../../shared/service/commitment.service";
import {ApplicationUserService} from "../../../../../../shared/service/application-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, switchMap} from "rxjs";
import {TaskDto} from "../../../../../../shared/dto/task.dto";
import {CommitmentDto} from "../../../../../../shared/dto/commitment.dto";
import {RoleEnum} from "../../../../../../shared/enum/role.enum";
import {AttachmentTypeEnum} from "../../../../../../shared/enum/attachment-type.enum";
import {AttachmentService} from "../../../../../../shared/service/attachment.service";
import {AttachmentDto} from "../../../../../../shared/dto/attachment.dto";
import {BadgeService} from "../../../../../../shared/service/badge.service";
import {BadgeDto} from "../../../../../../shared/dto/badge.dto";
import {CommitmentByUserModel} from "../../../../../../shared/model/commitment-by-user-model";
import {MatChipSelectionChange} from "@angular/material/chips";
import {FormControl, Validators} from "@angular/forms";
import {CommitmentStatusEnum} from "../../../../../../shared/enum/commitment-status.enum";
import {FileWebService} from "../../../../../../shared/service/api/file-web.service";
import {HandinByDateModel} from "../../../../../../shared/model/handin-by-date-model";
import {HandinService} from "../../../../../../shared/service/handin.service";
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.scss']
})
export class CorrectionComponent implements OnInit {
  @ViewChild("drawer") drawer!: MatDrawer;
  mode: MatDrawerMode = "side";
  threshold: number = 800;

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  classroom: ClassroomDto = {} as ClassroomDto;
  modul: ModulDto = {} as ModulDto;
  students: Map<number, ApplicationUserDto> = new Map;
  commitmentsByStudents:  CommitmentByUserModel[] = [];
  tasks: Map<number, TaskDto> = new Map;
  commitments: CommitmentDto[] = [];
  sumOfPointsForModul: number = 0;
  badges: BadgeDto[] = [];
  checkedBadges: number[] = [];
  selectedCommitment: CommitmentDto = {} as CommitmentDto;
  selectedCommitmentsByUser: CommitmentByUserModel = {} as CommitmentByUserModel;
  links: AttachmentDto[] = [];
  files: AttachmentDto[] = [];
  handinsByDate: HandinByDateModel[] = [];
  pointsControl: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private handinService: HandinService,
    private commitmentService: CommitmentService,
    private badgeService: BadgeService,
    private applicationUserService: ApplicationUserService,
    private route: ActivatedRoute,
    private router: Router,
    private fileWebService: FileWebService,
    private renderer: Renderer2
  ) {
    this.renderer.listen("window", "resize", this.setMenuMode);
    this.mode = this.getScreenWidth() >= this.threshold ? "side" : "over";
  }

  ngOnInit(): void {
    this.refreshData();
  }

  getClassroomAndStudents() {
    return this.route.queryParams
      .pipe(
        switchMap(params => {
          let classroomId = params['classroomId'];
          return this.classroomService.getClassroomById(classroomId)
        }),
        switchMap(classroom => {
          this.classroom = classroom;
          return this.applicationUserService.getUserByClassroom(classroom.id!)
        })
      );
  }

  getModulAndTasks() {
    return this.route.queryParams
      .pipe(
        switchMap(params => {
          let modulId = params['modulId'];
          return this.modulService.getModulById(modulId)
        }),
        switchMap(modul => {
          this.modul = modul;
          return this.taskService.getTasksByModulId(modul.id!)
        })
      );
  }

  navigate() {
    this.router.navigate(["application/classroom/modul"], {queryParams: {classroomId: this.classroom.id}});
  }

  view(commitment: CommitmentDto, commitmentsByStudent: CommitmentByUserModel) {
    if (this.getScreenWidth() <= this.threshold){
      this.drawer.close();
    }
    this.selectedCommitment = commitment;
    this.selectedCommitmentsByUser = commitmentsByStudent;
    this.pointsControl.clearValidators();
    this.pointsControl.addValidators([Validators.required, Validators.min(0), Validators.max(this.tasks.get(commitment.taskId)!.points)]);
    this.pointsControl.setValue(commitment.points);
    if (this.classroom.archived) {
      this.pointsControl.disable();
    }
    this.checkedBadges = [...this.selectedCommitment.badgeIds];
    // this.selectedCommitment.badgeIds.forEach(badgeId => {
    //   this.checkedBadges.push(this.badges.filter(badge => badge.id === badgeId)[0].id!)
    // });
    let uniqueDates: number[] = [];
    this.handinService.getHandinsByCommitmentId(commitment.id!)
      .subscribe(handins => {
        handins.forEach(handin => {
          uniqueDates.push(new Date(new Date(handin.timestamp).getFullYear(), new Date(handin.timestamp).getMonth(), new Date(handin.timestamp).getDate(), new Date(handin.timestamp).getHours(), new Date(handin.timestamp).getMinutes()).getTime());
        });
        uniqueDates = [...new Set(uniqueDates)];
        uniqueDates.sort();
        // console.log(uniqueDates)
        this.handinsByDate = [];
        uniqueDates.forEach(date => {
          let handinsByDate : HandinByDateModel = {
            date: new Date(date),
            handins: handins.filter(handin => date === new Date(new Date(handin.timestamp).getFullYear(), new Date(handin.timestamp).getMonth(), new Date(handin.timestamp).getDate(), new Date(handin.timestamp).getHours(), new Date(handin.timestamp).getMinutes()).getTime())
          }
          this.handinsByDate.push(handinsByDate);
        });
        // console.log(this.handinsByDate);
      });
    this.attachmentService.getAttachmentByTaskId(commitment.taskId)
      .subscribe(attachments => {
        this.links = attachments.filter(a => a.type === AttachmentTypeEnum.LINK);
        this.files = attachments.filter(a => a.type === AttachmentTypeEnum.FILE);
      });
  }

  getUsers(): string[] {
    let names: string[] = []
    if (this.students.size) {
      this.selectedCommitment.studentIds.forEach(studentId => names.push(this.students.get(studentId)!.name));
    }
    // console.log(names)
    return names;
  }

  refreshData() {
    combineLatest([
        this.getClassroomAndStudents(),
        this.getModulAndTasks()
      ]
    ).pipe(
      switchMap(
        data => {
          data[0].filter(user => user.role === RoleEnum.STUDENT).forEach(user => this.students.set(user.id!, user));
          this.sumOfPointsForModul = 0;
          data[1].forEach(task => {
            this.tasks.set(task.id!, task);
            this.sumOfPointsForModul += task.points;
          });
          return this.commitmentService.getCommitmentsByUsersAndModul(Array.from(this.students.keys()), Array.from(this.tasks.keys()));
        }
      )
    ).subscribe(commitments => {
      this.commitments = commitments;
      Array.from(this.students.keys()).forEach(studentId => {
        let commitmentList = commitments.filter(commitment => commitment.studentIds.includes(studentId));
        let score = 0;
        commitmentList.forEach(commitment => score += commitment.points);
        let commitmentModel: CommitmentByUserModel = {
          student: this.students.get(studentId)!,
          commitments: commitmentList,
          sumOfPoints: score
        }
        if (this.selectedCommitment.id && this.selectedCommitmentsByUser.student.id == commitmentModel.student.id) {
          this.view(this.selectedCommitment, commitmentModel);
        }
        // console.log("asd")
        this.commitmentsByStudents.push(commitmentModel);
      })
        // console.log(this.students);
        // console.log(this.tasks);
        // console.log(this.commitmentsByStudents);
      }
    );
    this.badgeService.getAllBadges()
      .subscribe(
        badges => {
          this.badges = badges;
        }
      );
  }

  checkBadge($event: MatChipSelectionChange, badge: BadgeDto) {
    if ($event.selected && !this.checkedBadges.includes(badge.id!)){
      this.checkedBadges.push(badge.id!);
      // console.log("push")
    }
    if (!$event.selected && this.checkedBadges.includes(badge.id!)){
      this.checkedBadges = this.checkedBadges.filter(badgeId => badgeId !== badge.id);
      // console.log("pop")
    }
  }

  arraysEquals(a: number[], b: number[]): boolean {
    // console.log(a);
    // console.log(b);
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  isBadgeButtonDisabled() {
    // console.log(this.selectedCommitment.badgeIds.sort());
    // console.log(this.checkedBadges.sort());
    return this.arraysEquals(this.selectedCommitment.badgeIds.sort(), this.checkedBadges.sort());
  }

  saveBadges() {
    if(!this.isBadgeButtonDisabled()){
      let commitment = new CommitmentDto(
        this.selectedCommitment.id!,
        this.selectedCommitment.points,
        this.selectedCommitment.status,
        this.selectedCommitment.deadline,
        this.selectedCommitment.taskId,
        this.selectedCommitment.studentIds,
        this.checkedBadges
      );
      this.commitmentService.updateCommitment(commitment)
        .subscribe(commitment=> {
          this.commitmentsByStudents = [];
          this.checkedBadges = [...commitment.badgeIds];
          this.refreshData();
          // this.view(commitment, this.selectedCommitmentsByUser)
          this.selectedCommitment = commitment;
        });
    }
  }

  isPointsButtonDisabled() {
    return this.pointsControl.invalid || this.pointsControl.value === this.selectedCommitment.points;
  }

  savePoints() {
    if(!this.isPointsButtonDisabled()){
      let commitment = new CommitmentDto(
        this.selectedCommitment.id!,
        this.pointsControl.value,
        CommitmentStatusEnum.Scored,
        this.selectedCommitment.deadline,
        this.selectedCommitment.taskId,
        this.selectedCommitment.studentIds,
        this.selectedCommitment.badgeIds
      );
      this.commitmentService.updateCommitment(commitment)
        .subscribe(commitment=> {
          this.commitmentsByStudents = [];
          // this.checkedBadges = commitment.badgeIds;
          this.selectedCommitment = commitment;
          this.refreshData();
          // this.selectedCommitmentsByUser = this.commitmentsByStudents.filter(commitmentsByStudent => commitmentsByStudent.student!.id === this.selectedCommitmentsByUser.student!.id)[0];
          // console.log(this.selectedCommitmentsByUser)
        })
    }
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

  getGrade(points: number) {
    if (points < this.modul.pointsFor2) {
      return 1;
    } else if (points < this.modul.pointsFor3) {
      return 2;
    } else if (points < this.modul.pointsFor4) {
      return 3;
    } else if (points < this.modul.pointsFor5) {
      return 4;
    } else {
      return 5;
    }
    // console.log(this.placeholder)
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
}
