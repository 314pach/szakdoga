import {Component, OnInit} from '@angular/core';
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FileWebService} from "../../../../../shared/service/api/file-web.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {switchMap} from "rxjs";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-picture-change',
  templateUrl: './profile-picture-change.component.html',
  styleUrls: ['./profile-picture-change.component.scss']
})
export class ProfilePictureChangeComponent implements OnInit {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  file: File = {} as File;

  fileControl: FormControl = new FormControl("", Validators.required);

  constructor(
    private applicationUserService: ApplicationUserService,
    private filWebService: FileWebService,
    private dialogRef: MatDialogRef<ProfilePictureChangeComponent>,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!).subscribe(user => {
      // console.log(user);
      this.loggedInUser = user;
    })
  }

  isDisabled() {
    return this.fileControl.invalid;
  }

  fileChanged($event: any) {
    this.file = $event.target.files[0];
  }

  save() {
    if (!this.isDisabled()) {
      this.filWebService.uploadFile(this.file)
        .pipe(
          switchMap(fileId => {
            // console.log(fileId)
            let user = new ApplicationUserDto(
              this.loggedInUser.id,
              this.loggedInUser.name,
              this.loggedInUser.email,
              this.loggedInUser.password,
              this.loggedInUser.role,
              fileId,
              this.loggedInUser.classRoomIds,
              this.loggedInUser.commitmentIds
            );
            return this.applicationUserService.updateUser(user);
          })
        ).subscribe(user => {
          this.loggedInUser = user;
          this._snackBar.open(
            "A művelet sikeres",
            "Ok",
            {duration: 5000}
          );
          this.dialogRef.close();
          window.location.reload();
      });
    }
  }
}
