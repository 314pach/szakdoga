import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ClassroomDto} from "../../../../shared/dto/classroom.dto";

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.scss']
})
export class UpdateClassroomComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {classroom: ClassroomDto}) { }
}
