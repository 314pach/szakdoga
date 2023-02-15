import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MatListModule,
    HttpClientModule
  ]
})
export class SharedModule { }
