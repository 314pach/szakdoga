import {Component, Inject} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../../../../shared/service/task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskDto} from "../../../../../../shared/dto/task.dto";
import {AttachmentService} from "../../../../../../shared/service/attachment.service";
import {AttachmentTypeEnum} from "../../../../../../shared/enum/attachment-type.enum";
import {AttachmentDto} from "../../../../../../shared/dto/attachment.dto";
import {forkJoin, switchMap} from "rxjs";
import {ApplicationUserDto} from "../../../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../../../shared/service/application-user.service";
import {FileWebService} from "../../../../../../shared/service/api/file-web.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  teamwork: boolean = false;
  submit: boolean = false;

  fileAttachments: AttachmentDto[] = [];
  deleteFormerFiles: boolean = false;
  linksFromDatabase: AttachmentDto[] = [];
  linksToDelete: number[] = [];
  linksToAdd: number = 0;

  titleControl: FormControl = new FormControl<string>("", Validators.required);
  summaryControl: FormControl = new FormControl<string>("", Validators.required);
  descriptionControl: FormControl = new FormControl<string>("", Validators.required);
  pointsControl: FormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  headcountControl: FormControl = new FormControl<number>(1, [Validators.required, Validators.min(0)]);
  linkForm: FormGroup;
  fileForm: FormGroup;
  filesArray: File[] = [];
  constructor(
    private taskService: TaskService,
    private applicationUserService: ApplicationUserService,
    @Inject(MAT_DIALOG_DATA) public data: {task: TaskDto, modulId: number},
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<UpdateTaskComponent>,
    private formBuilder: FormBuilder,
    private attachmentService: AttachmentService,
    private fileWebService: FileWebService,
  ) {
    this.titleControl.setValue(this.data.task.title);
    this.summaryControl.setValue(this.data.task.summary);
    this.descriptionControl.setValue(this.data.task.description);
    this.pointsControl.setValue(this.data.task.points);
    this.teamwork = this.data.task.teamwork;
    this.teamwork ? this.headcountControl.enable() : this.headcountControl.disable();
    this.headcountControl.setValue(this.data.task.headcount);
    this.submit = this.data.task.submit;
    this.linkForm = this.formBuilder.group({
      links: this.formBuilder.array([]),
    });
    this.fileForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    })
    this.attachmentService.getAttachmentByTaskId(this.data.task.id!)
      .subscribe(attachments => {
        attachments
          .filter(attachment => attachment.type === AttachmentTypeEnum.LINK)
          .forEach(attachment => this.addLink(attachment));
        this.linksFromDatabase = attachments.filter(attachment => attachment.type === AttachmentTypeEnum.LINK)
        this.fileAttachments = attachments.filter(attachment => attachment.type === AttachmentTypeEnum.FILE);
      });
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).subscribe(
      user => this.loggedInUser = user
    );
  }

  links(): FormArray {
    return this.linkForm.get("links") as FormArray
  }

  files(): FormArray {
    return this.fileForm.get("files") as FormArray
  }

  newLink(link: AttachmentDto): FormGroup {
    if (link.path !== "") {
      return this.formBuilder.group({
        id: new FormControl({value: link.id!, disabled: true}),
        url: new FormControl({value: link.path, disabled: true}, Validators.required)
      });
    } else {
      this.linksToAdd++;
      return this.formBuilder.group({
        id: new FormControl({value: null, disabled: true}),
        url: new FormControl("", Validators.required)
      });
    }
  }

  newFile(): FormGroup {
    return this.formBuilder.group({
      file: new FormControl('', [Validators.required])
    })
  }


  addLink(link: AttachmentDto = {path: ""} as AttachmentDto) {
    this.links().push(this.newLink(link));
  }

  addFile() {
    this.deleteFormerFiles = true;
    this.files().push(this.newFile());
  }

  removeLink(i: number, link: AbstractControl) {
    if (link.disabled) {
      this.linksToDelete.push(link.value.id);
    } else {
      this.linksToAdd--;
    }
    this.links().removeAt(i);
  }

  removeFile(i: number) {
    this.deleteFormerFiles = false;
    this.files().removeAt(i);
  }


  isDisabled() {
    if (this.titleControl.invalid || this.summaryControl.invalid || this.descriptionControl.invalid || this.pointsControl.invalid
      || this.headcountControl.invalid || this.linkForm.invalid || this.fileForm.invalid){
      return true;
    }

    return this.titleControl.value === this.data.task.title
      && this.summaryControl.value === this.data.task.summary
      && this.descriptionControl.value === this.data.task.description
      && this.pointsControl.value === this.data.task.points
      && this.teamwork === this.data.task.teamwork
      && this.headcountControl.value === this.data.task.headcount
      && this.submit === this.data.task.submit
      && this.linksToDelete.length === 0
      && this.linksToAdd === 0
      && !this.deleteFormerFiles;
  }

  save() { //todo attachments
    if (!this.isDisabled()){
      let task = new TaskDto(
        this.data.task.id,
        this.titleControl.value,
        this.summaryControl.value,
        this.descriptionControl.value,
        this.pointsControl.value,
        this.teamwork,
        this.headcountControl.value,
        this.submit,
        this.data.modulId
      );
      forkJoin(
        [
          this.taskService.updateTask(task),
          this.attachmentService.createAttachments(this.createLinksList()),
          this.attachmentService.deleteAttachments(this.linksToDelete),
        ]
      )
      .subscribe(
        _ => {
          this.saveFileAttachments();
          this._snackBar.open(
            "A feladat módosítása sikeres",
            "Ok",
            {duration: 5000}
          );
          this.taskService.getTasksByModulIdAndRefreshSubject(this.data.modulId);
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

  createLinksList(): AttachmentDto[]{
    let links: AttachmentDto[] = [];
    // console.log(this.linkForm.value.links)

    this.linkForm.value.links.forEach((input: object) => {
      // console.log(input);
      // @ts-ignore
      if (!input.id) {
        // @ts-ignore
        let path = input.url;
        let link = new AttachmentDto(
          null,
          path,
          AttachmentTypeEnum.LINK,
          this.data.task.id!,
          this.loggedInUser.id!,
          null
        );
        links.push(link);
      }
    });
    return links;
  }

  saveFileAttachments(){
    if (this.deleteFormerFiles) {
      let ids: number[] = [];
      this.fileAttachments.forEach(file => {
        ids.push(file.id!);
      });
      this.attachmentService.deleteAttachments(ids)
        .subscribe(_ => {
          // console.log("deleted")
        });
      Array.from(this.filesArray).forEach(input => {
        this.fileWebService.uploadFile(input)
          .pipe(
            switchMap(id => {
              let file = new AttachmentDto(
                null,
                input.name,
                AttachmentTypeEnum.FILE,
                this.data.task.id!,
                this.loggedInUser.id!,
                id
              );
              return this.attachmentService.createAttachment(file);
            }))
          .subscribe(_ => {
            // console.log("siker")
          });
      });
    }
  }

  fileSelectionChanged($event: any) {
    if ($event.target) {
      this.filesArray = $event.target.files;
    }
  }

  checkSubmit() {
    this.submit = !this.submit;
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
}
