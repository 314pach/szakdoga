import {Component} from '@angular/core';
import {ClassroomDto} from "../../../../../shared/dto/classroom.dto";
import {ModulDto} from "../../../../../shared/dto/modul.dto";
import {ClassroomService} from "../../../../../shared/service/classroom.service";
import {ModulService} from "../../../../../shared/service/modul.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-commitment',
  templateUrl: './commitment.component.html',
  styleUrls: ['./commitment.component.scss']
})
export class CommitmentComponent {
  classroom: ClassroomDto = {} as ClassroomDto;
  modul: ModulDto = {} as ModulDto;

  constructor(
    private classroomService: ClassroomService,
    private modulService: ModulService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      let classroomId = params['classroomId'];
      let modulId = params['modulId'];
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

}
