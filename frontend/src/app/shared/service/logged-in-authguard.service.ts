import { Injectable } from '@angular/core';
import {ApplicationUserService} from "./application-user.service";
import {Observable, of, switchMap} from "rxjs";
import {RoleEnum} from "../enum/role.enum";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean>{
    let token = localStorage.getItem("token");
    if (token === null) {
      return of(true);
    }
    this.router.navigateByUrl("application/classroom");
    return of(false);
  }
}
