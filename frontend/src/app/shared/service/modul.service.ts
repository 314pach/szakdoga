import { Injectable } from '@angular/core';
import {ModulWebService} from "./api/modul-web.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ModulDto} from "../dto/modul.dto";

@Injectable({
  providedIn: 'root'
})
export class ModulService {
  allModulsSubject: BehaviorSubject<ModulDto[]> = new BehaviorSubject<ModulDto[]>([]);

  private _selectedModulSubject: BehaviorSubject<ModulDto> = new BehaviorSubject<ModulDto>({} as ModulDto);

  constructor(private modulWebService: ModulWebService) {
    this.getAllModuls();
  }

  getAllModuls() {
    this.modulWebService.getAllModuls()
      .subscribe(
        classrooms => this.allModulsSubject.next(classrooms)
      );
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

  getSelectedModulSubject(): Observable<ModulDto> {
    return this._selectedModulSubject.asObservable();
  }

  setSelectedModulSubject(modul: ModulDto) {
    this._selectedModulSubject.next(modul);
  }
}
