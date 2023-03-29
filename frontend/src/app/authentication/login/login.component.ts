import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LoginRequestDto} from "../../shared/dto/login-request.dto";
import {AuthenticationService} from "../../shared/service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailControl: FormControl = new FormControl<string>("", [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl<string>("", Validators.required);

  constructor(
    private authenticationService: AuthenticationService
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
      this.authenticationService.login(user);
    }
  }
}
