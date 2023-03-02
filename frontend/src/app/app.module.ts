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
import {PasswordChangeComponent} from './component/content/profile/password-change/password-change.component';
import {DeleteProfileComponent} from './component/content/profile/delete-profile/delete-profile.component';
import {ProfilePictureChangeComponent} from './component/content/profile/profile-picture-change/profile-picture-change.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CreateClassroomComponent } from './component/content/classroom/create-classroom/create-classroom.component';
import { UpdateClassroomComponent } from './component/content/classroom/update-classroom/update-classroom.component';
import { DeleteClassroomComponent } from './component/content/classroom/delete-classroom/delete-classroom.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreateModulComponent } from './component/content/modul/create-modul/create-modul.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {CustomDateAdapter} from "./shared/adapter/custom-date-adapter";
import { DeleteModulComponent } from './component/content/modul/delete-modul/delete-modul.component';
import { UpdateModulComponent } from './component/content/modul/update-modul/update-modul.component';
import { MessageComponent } from './component/content/message/message.component';

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
    ProfilePictureChangeComponent,
    CreateClassroomComponent,
    UpdateClassroomComponent,
    DeleteClassroomComponent,
    CreateModulComponent,
    DeleteModulComponent,
    UpdateModulComponent,
    MessageComponent
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
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: "hu-HU"},
    {provide: DateAdapter, useClass: CustomDateAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
