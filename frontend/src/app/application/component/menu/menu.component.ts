import {Component, OnInit} from '@angular/core';
import {ApplicationUserDto} from "../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../shared/service/application-user.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {ApplicationComponent} from "../../application.component";
import {AuthenticationService} from "../../../shared/service/authentication.service";
import {RoleEnum} from "../../../shared/enum/role.enum";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  routeString: string = "";
  isTeacher: boolean = false;

  constructor(
    private applicationUserService: ApplicationUserService,
    private authenticationService: AuthenticationService,
    public parentComponent: ApplicationComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    applicationUserService.loggedInUserSubject.subscribe(user => {
      // console.log(user);
      this.loggedInUser = user;
      this.isTeacher = (user.role === RoleEnum.TEACHER);
    })
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // console.log(event);
      // @ts-ignore
      this.routeString = event.url;
    })
    // console.log(this.router.url);
    this.route.url.subscribe(url => console.log(url));
  }

  ngOnInit(): void {
    // console.log(this.router.url);
    // this.route.url.subscribe(url => console.log(url));
  }

  closeIfOver() {
    if (this.parentComponent.mode === "over") {
      this.parentComponent.drawer.close();
    }
  }

  getRoute(): string {
    if (this.routeString.startsWith("/profile")) {
      return "profile";
    }
    if (this.routeString.startsWith("/classroom")) {
      return "classroom";
    }
    if (this.routeString.startsWith("/modul")) {
      return "modul";
    }
    if (this.routeString.startsWith("/message")) {
      return "message";
    }
    return "";
  }

  logout() {
    this.authenticationService.logout();
  }
}
