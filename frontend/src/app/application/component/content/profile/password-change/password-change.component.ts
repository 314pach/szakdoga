import {Component} from '@angular/core';
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  hide1 = true;
  hide2 = true;
  hide3 = true;
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  confirmed: boolean = false;

  oldPasswordControl: FormControl = new FormControl<string>("", Validators.required);
  newPasswordControl: FormControl = new FormControl<string>("", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern("(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")]);
  newAgainPasswordControl: FormControl = new FormControl<string>("", Validators.required);

  constructor(
    private dialog: MatDialogRef<PasswordChangeComponent>,
    private applicationUserService: ApplicationUserService,
    private _snackBar: MatSnackBar
  ) {
    applicationUserService.loggedInUserSubject.subscribe(user => {
      this.loggedInUser = user;
    })
  }

  passwordsMatch() {
    if (this.newPasswordControl.value !== this.newAgainPasswordControl.value) {
      this.confirmed = false;
      this.newAgainPasswordControl.setErrors({'incorrect': true});
    } else {
      this.confirmed = true;
    }
  }

  isDisabled() {
    return this.oldPasswordControl.invalid || this.newPasswordControl.invalid || this.newAgainPasswordControl.invalid || !this.confirmed;
  }

  update() {
    if (this.oldPasswordControl.value !== this.loggedInUser.password){
      this._snackBar.open(
        "Helytelen jelszó",
        "Ok",
        {duration: 5000}
      );
      return;
    }
    if (!this.isDisabled()) {
      let updatedUser = new ApplicationUserDto(
        this.loggedInUser.id,
        this.loggedInUser.name,
        this.loggedInUser.email,
        this.newPasswordControl.value,
        this.loggedInUser.role,
        this.loggedInUser.classRoomIds,
        this.loggedInUser.commitmentIds
      )
      this.applicationUserService.updateUser(updatedUser)
        .subscribe(
          user => this.applicationUserService.loggedInUserSubject.next(user)
        );
      this.dialog.close();
    }
  }
}
