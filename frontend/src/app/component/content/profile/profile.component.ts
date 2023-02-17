import {Component, OnInit} from '@angular/core';
import {ApplicationUserService} from "../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../shared/dto/application-user.dto";
import {MatDialog} from "@angular/material/dialog";
import {PasswordChangeComponent} from "./password-change/password-change.component";
import {DeleteProfileComponent} from "./delete-profile/delete-profile.component";
import {ProfilePictureChangeComponent} from "./profile-picture-change/profile-picture-change.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  constructor(
    private applicationUserService: ApplicationUserService,
    private dialog: MatDialog
  ) {
    applicationUserService.allUsersSubject.subscribe(users => console.log(users))
    applicationUserService.loggedInUserSubject.subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
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
}
