import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {ApplicationUserService} from "./application-user.service";
import {RoleEnum} from "../enum/role.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleAuthguardService implements CanActivate {

  constructor(private applicationUserService: ApplicationUserService,) { }

  canActivate(): Observable<boolean>{
    return this.applicationUserService.loggedInUserSubject.pipe(
      switchMap(
        loggedInUser => {
          if (loggedInUser.role === RoleEnum.TEACHER){
            return of(true);
          }
          return of(false);
        }
      )
    )
  }
}
