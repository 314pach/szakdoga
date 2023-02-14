import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule} from "@angular/material/list";
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
