import {Component} from '@angular/core';
import {ApplicationUserDto} from "../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../shared/service/application-user.service";

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
  constructor(
    private applicationUserService: ApplicationUserService,

  ) {
    applicationUserService.loggedInUserSubject.subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
    })
  }
}
