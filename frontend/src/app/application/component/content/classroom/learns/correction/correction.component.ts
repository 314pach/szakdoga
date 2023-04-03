import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.scss']
})
export class CorrectionComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  classroom: ClassroomDto = {} as ClassroomDto;
  modul: ModulDto = {} as ModulDto;
  students: Map<number, ApplicationUserDto> = new Map;
  commitmentsByStudents:  CommitmentByUserModel[] = [];
  tasks: Map<number, TaskDto> = new Map;
  commitments: CommitmentDto[] = [];
  badges: BadgeDto[] = [];
  checkedBadges: number[] = [];
  selectedCommitment: CommitmentDto = {} as CommitmentDto;
  links: AttachmentDto[] = [];
  files: AttachmentDto[] = [];
  pointsControl: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private commitmentService: CommitmentService,
    private badgeService: BadgeService,
    private applicationUserService: ApplicationUserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

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

  view(commitment: CommitmentDto) {
    this.selectedCommitment = commitment;
    this.pointsControl.setValue(commitment.points);
    this.pointsControl.addValidators(Validators.max(this.tasks.get(commitment.taskId)!.points));
    this.checkedBadges = [...this.selectedCommitment.badgeIds];
    // this.selectedCommitment.badgeIds.forEach(badgeId => {
    //   this.checkedBadges.push(this.badges.filter(badge => badge.id === badgeId)[0].id!)
    // });
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
          data[1].forEach(task => this.tasks.set(task.id!, task));
          return this.commitmentService.getCommitmentsByUsersAndModul(Array.from(this.students.keys()), Array.from(this.tasks.keys()));
        }
      )
    ).subscribe(commitments => {
        this.commitments = commitments;
        Array.from(this.students.keys()).forEach(studentId => {
          let commitmentModel: CommitmentByUserModel = {
            student: this.students.get(studentId)!,
            commitments: commitments.filter(commitment => commitment.studentIds.includes(studentId))
          }
          this.commitmentsByStudents.push(commitmentModel);
        })
        console.log(this.students);
        console.log(this.tasks);
        console.log(this.commitmentsByStudents);
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
          this.refreshData();
          this.selectedCommitment = commitment;
        })
    }
  }
}
