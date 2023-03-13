import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

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

  constructor() {
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
}