import {Component, OnInit} from '@angular/core';
import {ApplicationUserService} from "../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../shared/dto/application-user.dto";
import {MatDialog} from "@angular/material/dialog";
import {PasswordChangeComponent} from "./password-change/password-change.component";
import {DeleteProfileComponent} from "./delete-profile/delete-profile.component";
import {ProfilePictureChangeComponent} from "./profile-picture-change/profile-picture-change.component";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  nameControl: FormControl = new FormControl<string>("", Validators.required);

  emailControl: FormControl = new FormControl<string>("", [Validators.required, Validators.email]);

  constructor(
    private applicationUserService: ApplicationUserService,
    private dialog: MatDialog
  ) {
    // applicationUserService.allUsersSubject.subscribe(users => console.log(users))
    let token = localStorage.getItem("token");
    applicationUserService.getUserByToken(token!).subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      this.nameControl.setValue(this.loggedInUser.name);
      this.emailControl.setValue(this.loggedInUser.email);
    })
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  ngOnInit(): void {
  }

  passwordChange() {
    let dialogRef = this.dialog.open(
      PasswordChangeComponent, {
        width: '600px',
        maxHeight: '500px',
        autoFocus: "first-tabbable"
      });
  }

  deleteProfile() {
    let dialogRef = this.dialog.open(
      DeleteProfileComponent, {
        width: '400px',
        maxHeight: '500px'
      });
  }

  profilePictureChange() {
    let dialogRef = this.dialog.open(
      ProfilePictureChangeComponent, {
        width: '400px',
        maxHeight: '500px'
      });
  }

  isDisabled() {
    // console.log(this.nameControl.value)
    if (this.nameControl.invalid || this.emailControl.invalid) {
      return true;
    }
    return this.nameControl.value === this.loggedInUser.name && this.emailControl.value === this.loggedInUser.email;
  }

  cancel() {
    this.nameControl.setValue(this.loggedInUser.name);
    this.emailControl.setValue(this.loggedInUser.email);
  }

  update() {
    if (!this.isDisabled()) {
      let updatedUser = new ApplicationUserDto(
        this.loggedInUser.id,
        this.nameControl.value,
        this.emailControl.value,
        this.loggedInUser.password,
        this.loggedInUser.role,
        this.loggedInUser.classRoomIds,
        this.loggedInUser.commitmentIds
      )
      this.applicationUserService.updateUser(updatedUser)
        .subscribe(
          user => this.applicationUserService.loggedInUserSubject.next(user)
        );
    }
  }
}
