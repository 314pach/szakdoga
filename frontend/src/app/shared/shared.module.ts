import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDividerModule} from "@angular/material/divider";
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    HttpClientModule,
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
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule
  ],
  exports: [
    CommonModule,
    MatListModule,
    HttpClientModule,
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
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    MatTabsModule,
    MatSlideToggleModule
  ]
})
export class SharedModule { }
