import { Component } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  teamwork: boolean = false;

  isDisabled() {
    return undefined;
  }

  save() {

  }

  checkTeamwork() {
    this.teamwork = !this.teamwork;
  }
}
