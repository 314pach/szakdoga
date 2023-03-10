import { Injectable } from '@angular/core';
import {ModulWebService} from "./api/modul-web.service";
import {BehaviorSubject} from "rxjs";
import {ModulDto} from "../dto/modul.dto";

@Injectable({
  providedIn: 'root'
})
export class ModulService {
  allModulsSubject: BehaviorSubject<ModulDto[]> = new BehaviorSubject<ModulDto[]>([]);

  constructor(private modulWebService: ModulWebService) {
    this.getAllModuls();
  }

  getAllModuls() {
    this.modulWebService.getAllModuls()
      .subscribe(
        classrooms => this.allModulsSubject.next(classrooms)
      );
  }

  getModulById(modulId: number) {
    return this.modulWebService.getModulById(modulId);
  }

  createModul(modul: ModulDto) {
    return this.modulWebService.createModul(modul);
  }

  updateModul(modul: ModulDto) {
    return this.modulWebService.updateModul(modul);
  }

  deleteModul(modulId: number) {
    return this.modulWebService.deleteModul(modulId);
  }
}
