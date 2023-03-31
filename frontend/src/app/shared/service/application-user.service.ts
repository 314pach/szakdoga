import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ApplicationUserDto} from "../dto/application-user.dto";
import {ApplicationUserWebService} from "./api/application-user-web.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService {
  allUsersSubject: BehaviorSubject<ApplicationUserDto[]> = new BehaviorSubject<ApplicationUserDto[]>([]);
  loggedInUserSubject: BehaviorSubject<ApplicationUserDto> = new BehaviorSubject<ApplicationUserDto>({} as ApplicationUserDto);

  constructor(private applicationUserWebService: ApplicationUserWebService) {
    // this.getAllUsers(); //todo ezt nem itt kellene
    // this.getUserById(1)
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

  getUserByToken(token: string) {
    return this.applicationUserWebService.getUserByToken(token);
  }

  getUserByClassroom(classroomId: number) {
    return this.applicationUserWebService.getUsersByClassroom(classroomId);
  }

  getUsersByIds(userIds: number[]) : Observable<ApplicationUserDto[]> {
    return this.applicationUserWebService.getUsersByIds(userIds);
  }

  updateUser(user: ApplicationUserDto){
    return this.applicationUserWebService.updateUser(user)
  }

  deleteUser(userId: number){
    return this.applicationUserWebService.deleteUser(userId);
  }
}
