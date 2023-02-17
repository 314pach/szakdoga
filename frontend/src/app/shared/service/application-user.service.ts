import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ApplicationUserDto} from "../dto/application-user.dto";
import {ApplicationUserWebService} from "./api/application-user-web.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService {
  allUsersSubject: BehaviorSubject<ApplicationUserDto[]> = new BehaviorSubject<ApplicationUserDto[]>([]);
  loggedInUserSubject: BehaviorSubject<ApplicationUserDto> = new BehaviorSubject<ApplicationUserDto>({} as ApplicationUserDto);

  constructor(private applicationUserWebService: ApplicationUserWebService) {
    this.getAllUsers();
    this.getUserById(3)
  }

  getAllUsers() {
    this.applicationUserWebService.getAllUsers()
      .subscribe(
        users => this.allUsersSubject.next(users)
      );
  }

  getUserById(id: number) {
    this.applicationUserWebService.getUserById(id)
      .subscribe(
          user => this.loggedInUserSubject.next(user)
      );
  }

  updateUser(user: ApplicationUserDto){
    this.applicationUserWebService.updateUser(user)
      .subscribe(
        user => this.loggedInUserSubject.next(user)
      )
  }
}
