import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./component/content/profile/profile.component";
import {ClassroomComponent} from "./component/content/classroom/classroom.component";
import {ModulComponent} from "./component/content/modul/modul.component";

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
    component: ModulComponent
  }
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
