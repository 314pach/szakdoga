import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LoginRequestDto} from "../../shared/dto/login-request.dto";
import {AuthenticationService} from "../../shared/service/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {ApplicationUserService} from "../../shared/service/application-user.service";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailControl: FormControl = new FormControl<string>("", [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl<string>("", Validators.required);

  constructor(
    private authenticationService: AuthenticationService,
    private applicationUserService: ApplicationUserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  isDisabled() {
    return this.emailControl.invalid || this.passwordControl.invalid;
  }

  login() {
    if (!this.isDisabled()){
      let user = new LoginRequestDto(
        this.emailControl.value,
        this.passwordControl.value
      )
      this.authenticationService.login(user)
        .pipe(
          catchError(err => {
            if(err.status === 403) {
              this._snackBar.open(
                "Hibás felhasználónév vagy jelszó",
                "Ok",
                {
                  duration: 5000,
                  panelClass: ['red-snackbar']}
              )
              throw "Authentication error";
            }
            throw err;
          })
        ).subscribe(response => {
        // console.log(response)
        this.applicationUserService.loggedInUserSubject.next(response.applicationUser);
        localStorage.setItem("token", response.token);
        this.router.navigateByUrl("application")
      })
    }
  }
}
