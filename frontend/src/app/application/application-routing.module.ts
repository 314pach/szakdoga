import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./component/content/profile/profile.component";
import {ClassroomComponent} from "./component/content/classroom/classroom.component";
import {ModulComponent} from "./component/content/modul/modul.component";
import {MessageComponent} from "./component/content/message/message.component";
import {TaskComponent} from "./component/content/modul/task/task.component";
import {LearnsComponent} from "./component/content/classroom/learns/learns.component";
import {CommitmentComponent} from "./component/content/classroom/learns/commitment/commitment.component";
import {RoleAuthguardService} from "../shared/service/role-authguard.service";
import {CorrectionComponent} from "./component/content/classroom/learns/correction/correction.component";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "classroom",
    component: ClassroomComponent
  },
  {
    path: "modul",
    component: ModulComponent,
    canActivate: [RoleAuthguardService]
  },
  {
    path: "message",
    component: MessageComponent
  },
  {
    path: "modul/task",
    component: TaskComponent,
    canActivate: [RoleAuthguardService]
  },
  {
    path: "classroom/modul",
    component: LearnsComponent
  },
  {
    path: "classroom/modul/commitment",
    component: CommitmentComponent
  },
  {
    path: "classroom/modul/correction",
    component: CorrectionComponent,
    canActivate: [RoleAuthguardService]
  },
  {
    path: "",
    redirectTo: "classroom",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
