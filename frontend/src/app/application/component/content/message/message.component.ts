import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApplicationUserDto} from "../../../../shared/dto/application-user.dto";
import {ApplicationUserService} from "../../../../shared/service/application-user.service";
import {MessageService} from "../../../../shared/service/message.service";
import {switchMap} from "rxjs";
import {MessageDto} from "../../../../shared/dto/message.dto";
import {FormControl} from "@angular/forms";
import {MessageStatusEnum} from "../../../../shared/enum/message-status.enum";
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  @ViewChild("drawer") drawer!: MatDrawer;
  mode: MatDrawerMode = "side";
  threshold: number = 800;

  loggedInUser: ApplicationUserDto = {} as ApplicationUserDto;
  users: ApplicationUserDto[] = [];
  filteredUsers: ApplicationUserDto[] = [];
  selectedUser: ApplicationUserDto = {} as ApplicationUserDto;
  messages: MessageDto[] = [];
  search: string = "";

  messageControl: FormControl = new FormControl<string>("");

  constructor(
    private applicationUserService: ApplicationUserService,
    public messageService: MessageService,
    private renderer: Renderer2
  ) {
    this.renderer.listen("window", "resize", this.setMenuMode);
    this.mode = this.getScreenWidth() >= this.threshold ? "side" : "over";
  }

  ngOnInit(): void {
    this.messageService.connectToSelectedMessages();
    let token = localStorage.getItem("token");
    this.applicationUserService.getUserByToken(token!)
      .pipe(
        switchMap(user => {
          this.loggedInUser = user
          if (this.selectedUser.id) {
            this.messageService.getSelectedMessages(user.id!, this.selectedUser.id!);
          }
          this.applicationUserService.getAllUsers();
          return this.applicationUserService.allUsersSubject;
        })
      )
      .subscribe(users => {
        this.users = users.filter(u => u.id !== this.loggedInUser.id);
        this.filteredUsers = users.filter(u => u.id !== this.loggedInUser.id);
      });
  }

  open(user: ApplicationUserDto) {
    if (this.getScreenWidth() <= this.threshold){
      this.drawer.close();
    }
    // console.log(this.loggedInUser);
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
          message => this.messageService.sendMessageToSelected(message)
        );
      this.messageControl.setValue("");
    }
  }

  ngOnDestroy(): void {
    this.messageService.disconnectFromSelectedMessages();
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  setMenuMode = (e: Event) => {
    if (this.getScreenWidth() >= this.threshold){
      if (this.mode === "over"){
        this.drawer.open();
      }
      this.mode = "side";
    } else {
      if (this.mode === "side"){
        this.drawer.close();
      }
      this.mode = "over"
    }
  }
}
