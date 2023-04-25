import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ApplicationComponent} from "./application/application.component";
import {AuthguardService} from "./shared/service/authguard.service";
import {LoggedInAuthguardService} from "./shared/service/logged-in-authguard.service";

const routes: Routes = [
  {
    path: "authentication",
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [LoggedInAuthguardService]
  },
  {
    path: "application",
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    component: ApplicationComponent,
    canActivate: [AuthguardService]
  },
  {
    path: "",
    redirectTo: "authentication",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "authentication",
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
