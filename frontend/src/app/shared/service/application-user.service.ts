import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ApplicationUserDto} from "../dto/application-user.dto";
import {ApplicationUserWebService} from "./api/application-user-web.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService {
  allUsersSubject: BehaviorSubject<ApplicationUserDto[]> = new BehaviorSubject<ApplicationUserDto[]>([]);

  constructor(private applicationUserWebService: ApplicationUserWebService) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.applicationUserWebService.getAllUsers()
      .subscribe(
        users => this.allUsersSubject.next(users)
      );
  }
}
