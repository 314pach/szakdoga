import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./component/content/profile/profile.component";
import {ClassroomComponent} from "./component/content/classroom/classroom.component";
import {ModulComponent} from "./component/content/modul/modul.component";
import {MessageComponent} from "./component/content/message/message.component";
import {TaskComponent} from "./component/content/modul/task/task.component";

const routes: Routes = [
  {
    path: "authentication",
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
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
    component: ModulComponent
  },
  {
    path: "message",
    component: MessageComponent
  },
  {
    path: "modul/task",
    component: TaskComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
