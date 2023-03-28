import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ApplicationComponent} from "./application/application.component";

const routes: Routes = [
  {
    path: "authentication",
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: "application",
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    component: ApplicationComponent
  },
  {
    path: "",
    redirectTo: "authentication",
    pathMatch: "full"
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
