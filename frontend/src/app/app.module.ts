import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './component/menu/menu.component';
import { ContentComponent } from './component/content/content.component';
import {RouterModule} from "@angular/router";
import { ProfileComponent } from './component/content/profile/profile.component';
import { ClassroomComponent } from './component/content/classroom/classroom.component';
import { ModulComponent } from './component/content/modul/modul.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    ProfileComponent,
    ClassroomComponent,
    ModulComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
