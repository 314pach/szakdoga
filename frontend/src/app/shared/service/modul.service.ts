import { Injectable } from '@angular/core';
import {ModulWebService} from "./api/modul-web.service";

@Injectable({
  providedIn: 'root'
})
export class ModulService {

  constructor(private modulWebService: ModulWebService) { }
}
