import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './component/menu/menu.component';
import {ContentComponent} from './component/content/content.component';
import {RouterModule} from "@angular/router";
import {ProfileComponent} from './component/content/profile/profile.component';
import {ClassroomComponent} from './component/content/classroom/classroom.component';
import {ModulComponent} from './component/content/modul/modul.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { PasswordChangeComponent } from './component/content/profile/password-change/password-change.component';
import { DeleteProfileComponent } from './component/content/profile/delete-profile/delete-profile.component';
import { ProfilePictureChangeComponent } from './component/content/profile/profile-picture-change/profile-picture-change.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    ProfileComponent,
    ClassroomComponent,
    ModulComponent,
    PasswordChangeComponent,
    DeleteProfileComponent,
    ProfilePictureChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
