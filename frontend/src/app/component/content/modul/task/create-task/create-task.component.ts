import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskDto} from "../../../../../shared/dto/task.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../../../../shared/service/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {switchMap} from "rxjs";
import {AttachmentService} from "../../../../../shared/service/attachment.service";
import {AttachmentDto} from "../../../../../shared/dto/attachment.dto";
import {AttachmentTypeEnum} from "../../../../../shared/enum/attachment-type.enum";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  teamwork: boolean = false;

  titleControl: FormControl = new FormControl<string>("", Validators.required);
  summaryControl: FormControl = new FormControl<string>("", Validators.required);
  descriptionControl: FormControl = new FormControl<string>("", Validators.required);
  pointsControl: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  headcountControl: FormControl = new FormControl<number>(1, [Validators.required, Validators.min(0)]);

  linkForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private applicationUserService: ApplicationUserService,
    @Inject(MAT_DIALOG_DATA) public data: { modulId: number},
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<CreateTaskComponent>,
    private formBuilder: FormBuilder
  ) {
    this.headcountControl.disable();
    this.linkForm = this.formBuilder.group({
      links: this.formBuilder.array([]),
    });
    this.applicationUserService.loggedInUserSubject.subscribe(
      user => this.loggedInUser = user
    );
  }

  links(): FormArray {
    return this.linkForm.get("links") as FormArray
  }

  newLink(): FormGroup {
    return this.formBuilder.group({
      url: new FormControl("", Validators.required)
    })
  }

  addLink() {
    this.links().push(this.newLink());
  }

  removeLink(i: number) {
    this.links().removeAt(i);
  }

  isDisabled() {
    return this.titleControl.invalid || this.summaryControl.invalid || this.descriptionControl.invalid || this.pointsControl.invalid
      || this.headcountControl.invalid || this.linkForm.invalid;
  }

  save() { //todo attachments - type: file!
    if (!this.isDisabled()) {
      let task = new TaskDto(
        null,
        this.titleControl.value,
        this.summaryControl.value,
        this.descriptionControl.value,
        this.pointsControl.value,
        this.teamwork,
        this.headcountControl.value,
        this.data.modulId
      );
      this.taskService.createTask(task)
        .pipe(
          switchMap(task => {
              let links: AttachmentDto[] = [];
              this.linkForm.value.links.forEach((input: object) => {
                // @ts-ignore
                let path = input.url;
                let link = new AttachmentDto(
                  null,
                  path,
                  AttachmentTypeEnum.LINK,
                  task.id!,
                  this.loggedInUser.id!
                );
                links.push(link);
              });
              return this.attachmentService.createAttachments(links);
            }
          )
        )
        .subscribe(
          task => {
            this._snackBar.open(
              "A feladat létrehozása sikeres",
              "Ok",
              {duration: 5000}
            );
            this.taskService.getTasksByModulId(this.data.modulId);
          }
        );
      this.dialog.close();
    }
  }

  checkTeamwork() {
    this.teamwork = !this.teamwork;
    if (!this.teamwork) {
      this.headcountControl.setValue(1);
      this.headcountControl.disable();
    } else {
      this.headcountControl.enable();
    }
  }

  addUrlField() {
    console.log("add url field")
  }
}
