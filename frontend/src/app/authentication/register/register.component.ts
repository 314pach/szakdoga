import * as bcrypt from 'bcryptjs';
import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/service/authentication.service";
import {RegisterRequestDto} from "../../shared/dto/register-request.dto";
import {catchError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide1 = true;
  hide2 = true;

  confirmed: boolean = false;

  nameControl: FormControl = new FormControl<string>("", Validators.required);
  emailControl: FormControl = new FormControl<string>("", [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl<string>("", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern("(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")]);
  passwordAgainControl: FormControl = new FormControl<string>("", Validators.required);

  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  passwordsMatch() {
    if (this.passwordControl.value !== this.passwordAgainControl.value) {
      this.confirmed = false;
      this.passwordAgainControl.setErrors({'incorrect': true});
    } else {
      this.confirmed = true;
    }
  }

  isDisabled() {
    return this.nameControl.invalid || this.emailControl.invalid || this.passwordControl.invalid || this.passwordAgainControl.invalid || !this.confirmed;
  }

  register() {
    if (!this.isDisabled()){
      let newUser = new RegisterRequestDto(
        this.nameControl.value,
        this.emailControl.value,
        this.passwordControl.value
      );
      this.authenticationService.register(newUser)
        .pipe(
          catchError(err => {
            if(err.status === 403) {
              // localStorage.clear();
              this._snackBar.open(
                "Hiba a regisztráció során: az e-mail cím már foglalt!",
                "Ok",
                {
                  duration: 5000,
                  panelClass: ['red-snackbar']}
              )
              throw "Authentication error";
            }
            throw err;
          })
        ).subscribe(
          _ => this.router.navigateByUrl("authentication/login")
        );
    }
  }
}
