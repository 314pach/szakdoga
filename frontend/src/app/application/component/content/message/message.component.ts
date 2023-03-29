import {Component, OnInit} from '@angular/core';
import {ApplicationUserDto} from "../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../shared/service/application-user.service";
import {MessageService} from "../../../../shared/service/message.service";
import {switchMap} from "rxjs";
import {MessageDto} from "../../../../shared/dto/message.dto";
import {FormControl} from "@angular/forms";
import {MessageStatusEnum} from "../../../../shared/enum/message-status.enum";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  users: ApplicationUserDto[] = [];
  filteredUsers: ApplicationUserDto[] = [];
  selectedUser: ApplicationUserDto = {} as ApplicationUserDto;
  messages: MessageDto[] = [];
  search: string = "";

  messageControl: FormControl = new FormControl<string>("");

  constructor(
    private applicationUserService: ApplicationUserService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.applicationUserService.loggedInUserSubject
      .pipe(
        switchMap(user => {
          this.loggedInUser = user
          if (this.selectedUser.id) {
            this.messageService.getSelectedMessages(user.id!, this.selectedUser.id!);
          }
          return this.messageService.selectedMessagesSubject;
        }),
        switchMap(messages => {
          this.messages = messages.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
          // console.log(messages);
          return this.applicationUserService.allUsersSubject;
        })
      )
      .subscribe(users => {
        this.users = users.filter(u => u.id !== this.loggedInUser.id);
        this.filteredUsers = users.filter(u => u.id !== this.loggedInUser.id);
      });
  }

  open(user: ApplicationUserDto) {
    console.log(this.loggedInUser);
    this.selectedUser = user;
    this.messageService.getSelectedMessages(this.loggedInUser.id!, this.selectedUser.id!);
  }

  doSearch() {
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().startsWith(this.search.toLowerCase()));
  }

  send() {
    if (this.messageControl.value.trim() !== "") {
      let message = new MessageDto(
        null,
        new Date(),
        this.messageControl.value,
        MessageStatusEnum.UNREAD,
        "",
        this.loggedInUser.id!,
        this.selectedUser.id!
      );
      this.messageService.createMessage(message)
        .subscribe(
          _ => this.messageService.getSelectedMessages(this.loggedInUser.id!, this.selectedUser.id!)
        );
      this.messageControl.setValue("");
    }
  }
}
