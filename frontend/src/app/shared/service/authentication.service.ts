import { Injectable } from '@angular/core';
import {AuthenticationWebService} from "./api/authentication-web.service";
import {RegisterRequestDto} from "../dto/register-request.dto";
import {Observable} from "rxjs";
import {AuthenticationResponseDto} from "../dto/authentication-response.dto";
import {LoginRequestDto} from "../dto/login-request.dto";
import {ApplicationUserService} from "./application-user.service";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private authenticationWebService: AuthenticationWebService,
    private applicationUserService: ApplicationUserService,
    private router: Router
  ) { }

  register(newUser: RegisterRequestDto){
    this.authenticationWebService.register(newUser)
      .subscribe(_ => this.router.navigateByUrl("authentication/login"))
  }

  login(user: LoginRequestDto){
    this.authenticationWebService.login(user)
      .subscribe(response => {
        // console.log(response)
        this.applicationUserService.loggedInUserSubject.next(response.applicationUser);
        localStorage.setItem("token", response.token);
        this.router.navigateByUrl("application")
      });
  }

  logout(){
    this.authenticationWebService.logout().subscribe(
      _ => {
        localStorage.removeItem("token");
        this.router.navigateByUrl("authentication/login" );
      }
    )
  }
}
