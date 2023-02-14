import { Component, OnInit } from '@angular/core';
import {ApplicationUserService} from "../../../shared/service/application-user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private applicationUserService: ApplicationUserService) {
    applicationUserService.allUsersSubject.subscribe(users => console.log(users))
  }

  ngOnInit(): void {
  }

}
