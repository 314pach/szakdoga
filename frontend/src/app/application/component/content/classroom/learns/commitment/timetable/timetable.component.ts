import {Component, OnInit} from '@angular/core';
import {ApplicationUserService} from "../../../../../../../shared/service/application-user.service";
import {CommitmentService} from "../../../../../../../shared/service/commitment.service";
import {TaskService} from "../../../../../../../shared/service/task.service";
import {ApplicationUserDto} from "../../../../../../../shared/dto/application-user.dto";
import {switchMap} from "rxjs";
import {CommitmentStatusEnum} from "../../../../../../../shared/enum/commitment-status.enum";
import {TaskDto} from "../../../../../../../shared/dto/task.dto";
import {CommitmentDto} from "../../../../../../../shared/dto/commitment.dto";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit{
  readonly months = [
    'Január',
    'Február',
    'Március',
    'Április',
    'Május',
    'Június',
    'Július',
    'Augusztus',
    'Szeptember',
    'Október',
    'November',
    'December',
  ];

  currentDate: Date = new Date();
  calendarMonth: string = '';
  calendarDate: Date = new Date();
  previousDays: number[] = [];
  currentDays: Map<number, number> = new Map<number, number>();
  nextDays: number[] = [];
  today: number = 0;
  eventDays: number[] = [];
  outputDateOnCalendar: Date = new Date();

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  tasks: Map<number, TaskDto> = new Map<number, TaskDto>();
  commitments: CommitmentDto[] = [];
  commitmentDates: number[] = [];

  constructor(
    private applicationUserService: ApplicationUserService,
    private commitmentService: CommitmentService,
    private taskService: TaskService,
  ) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!)
      .subscribe( user => this.loggedInUser = user);
    this.refreshData();
  }

  refreshData() {
    this.commitmentService.commitmentsByModulSubject
      .pipe(
        switchMap(commitments => {
          this.commitments = commitments;
          this.commitmentDates = [];
          let commitedTaskIds : number[] = [];
          commitments.forEach(commitment => {
            commitedTaskIds.push(commitment.taskId)
            if (!this.commitmentDates.includes(new Date(commitment.deadline).getTime())) {
              this.commitmentDates.push(new Date(commitment.deadline).getTime());
            }
          });
          return this.taskService.getTasksByIds(commitedTaskIds);
        })
      )
      .subscribe(tasks => {
        tasks.forEach(task => this.tasks.set(task.id!, task));
        this.renderCalendar();
      });
  }

  navigateBack(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  navigateForward(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  backToCurrentDate(): void {
    this.currentDate = new Date();
    this.renderCalendar();
  }

  renderCalendar(): void {
    this.previousDays = [];
    this.currentDays = new Map<number, number>();
    this.nextDays = [];
    this.today = 0;
    this.eventDays = [];

    this.currentDate.setDate(1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    const firstDayIndex = this.currentDate.getDay() - 1;
    const lastDayIndex = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDay() - 1;
    let nextDays = 7 - lastDayIndex - 1;

    this.calendarMonth = this.months[this.currentDate.getMonth()];
    this.calendarDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    for (let x = firstDayIndex; x > 0; x--) this.previousDays.push(prevLastDay - x + 1);

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        this.currentDate.getMonth() === new Date().getMonth() &&
        this.currentDate.getFullYear() === new Date().getFullYear()
      )
        this.today = i;

      let currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() + i - 1
      ).getTime();

      this.currentDays.set(i, currentDate);

      if (this.commitmentDates.includes(currentDate)) this.eventDays.push(i);
    }

    if (firstDayIndex === -1) nextDays -= 1;

    for (let j = 1; j <= nextDays; j++) this.nextDays.push(j);
  }

  getTooltipForEventDay(currentDate: number): string {
    let tooltip: string = '';
    this.commitments.forEach(commitment => {
      let commitmentDate = new Date(commitment.deadline);
      if (
        new Date(commitmentDate.getFullYear(), commitmentDate.getMonth(), commitmentDate.getDate()).getTime() ===
        currentDate
        && this.tasks.get(commitment!.taskId)
      ) {
        tooltip += this.tasks.get(commitment!.taskId)!.title + '\n';
      }
    });

    return tooltip;
  }

}
