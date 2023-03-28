import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {MenuComponent} from "./component/menu/menu.component";
import {ContentComponent} from "./component/content/content.component";
import {ProfileComponent} from "./component/content/profile/profile.component";
import {ClassroomComponent} from "./component/content/classroom/classroom.component";
import {ModulComponent} from "./component/content/modul/modul.component";
import {PasswordChangeComponent} from "./component/content/profile/password-change/password-change.component";
import {DeleteProfileComponent} from "./component/content/profile/delete-profile/delete-profile.component";
import {
  ProfilePictureChangeComponent
} from "./component/content/profile/profile-picture-change/profile-picture-change.component";
import {CreateClassroomComponent} from "./component/content/classroom/create-classroom/create-classroom.component";
import {UpdateClassroomComponent} from "./component/content/classroom/update-classroom/update-classroom.component";
import {DeleteClassroomComponent} from "./component/content/classroom/delete-classroom/delete-classroom.component";
import {CreateModulComponent} from "./component/content/modul/create-modul/create-modul.component";
import {DeleteModulComponent} from "./component/content/modul/delete-modul/delete-modul.component";
import {UpdateModulComponent} from "./component/content/modul/update-modul/update-modul.component";
import {MessageComponent} from "./component/content/message/message.component";
import {TaskComponent} from "./component/content/modul/task/task.component";
import {CreateTaskComponent} from "./component/content/modul/task/create-task/create-task.component";
import {DeleteTaskComponent} from "./component/content/modul/task/delete-task/delete-task.component";
import {UpdateTaskComponent} from "./component/content/modul/task/update-task/update-task.component";
import {LearnsComponent} from "./component/content/classroom/learns/learns.component";
import {EditLearnsComponent} from "./component/content/classroom/learns/edit-learns/edit-learns.component";
import {CommitmentComponent} from "./component/content/classroom/learns/commitment/commitment.component";
import {
  CreateCommitmentComponent
} from "./component/content/classroom/learns/commitment/create-commitment/create-commitment.component";
import {
  ViewCommitmentComponent
} from "./component/content/classroom/learns/commitment/view-commitment/view-commitment.component";
import {
  AssembleTeamComponent
} from "./component/content/classroom/learns/commitment/create-commitment/assemble-team/assemble-team.component";
import {SharedModule} from "../shared/shared.module";
import { ApplicationComponent } from './application.component';


@NgModule({
  declarations: [
    MenuComponent,
    ContentComponent,
    ProfileComponent,
    ClassroomComponent,
    ModulComponent,
    PasswordChangeComponent,
    DeleteProfileComponent,
    ProfilePictureChangeComponent,
    CreateClassroomComponent,
    UpdateClassroomComponent,
    DeleteClassroomComponent,
    CreateModulComponent,
    DeleteModulComponent,
    UpdateModulComponent,
    MessageComponent,
    TaskComponent,
    CreateTaskComponent,
    DeleteTaskComponent,
    UpdateTaskComponent,
    LearnsComponent,
    EditLearnsComponent,
    CommitmentComponent,
    CreateCommitmentComponent,
    ViewCommitmentComponent,
    AssembleTeamComponent,
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule
  ]
})
export class ApplicationModule { }
