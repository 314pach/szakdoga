import { Component, OnInit } from '@angular/core';
import {ApplicationUserDto} from "../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../shared/service/application-user.service";
import {AppComponent} from "../../app.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  routeString: string = "";

  constructor(
    private applicationUserService: ApplicationUserService,
    public parentComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    applicationUserService.loggedInUserSubject.subscribe(user => {
      // console.log(user);
      this.loggedInUser = user;
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
    if (this.parentComponent.mode === "over"){
      this.parentComponent.drawer.close();
    }
  }

  getRoute(): string {
    if (this.routeString.startsWith("/profile")){
      return "profile";
    }
    if (this.routeString.startsWith("/classroom")){
      return "classroom";
    }
    if (this.routeString.startsWith("/modul")){
      return "modul";
    }
    if (this.routeString.startsWith("/message")){
      return "message";
    }
    return "";
  }
}
