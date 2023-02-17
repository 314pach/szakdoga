import { Component, OnInit } from '@angular/core';
import {ApplicationUserDto} from "../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../shared/service/application-user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  constructor(private applicationUserService: ApplicationUserService) {
    applicationUserService.loggedInUserSubject.subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
    })
  }

  ngOnInit(): void {
  }

  test(){
    console.log("asd");
  }

}
