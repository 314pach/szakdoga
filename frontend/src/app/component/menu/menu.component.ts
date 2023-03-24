import { Component, OnInit } from '@angular/core';
import {ApplicationUserDto} from "../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../shared/service/application-user.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;

  constructor(
    private applicationUserService: ApplicationUserService,
    public parentComponent: AppComponent
  ) {
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

  closeIfOver() {
    if (this.parentComponent.mode === "over"){
      this.parentComponent.drawer.close();
    }
  }
}
