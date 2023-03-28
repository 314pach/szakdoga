import { Component } from '@angular/core';
import {ApplicationUserService} from "../../../../../shared/service/application-user.service";
import {ApplicationUserDto} from "../../../../../shared/dto/application-user.dto";

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  constructor(
    private applicationUserService: ApplicationUserService,
  ) {
    applicationUserService.loggedInUserSubject.subscribe(user => {
      this.loggedInUser = user;
    })
  }

  delete() {
    this.applicationUserService.deleteUser(this.loggedInUser.id!)
      .subscribe(_ => this.applicationUserService.loggedInUserSubject.next({} as ApplicationUserDto));
  }
}
