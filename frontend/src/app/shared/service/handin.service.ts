import { Injectable } from '@angular/core';
import {HandinWebService} from "./api/handin-web.service";
import {HandinDto} from "../dto/handin.dto";

@Injectable({
  providedIn: 'root'
})
export class HandinService {

  constructor(private handinWebService: HandinWebService) { }

  createHandin(handin: HandinDto) {
    return this.handinWebService.createHandin(handin);
  }

  getHandinsByCommitmentId(commitmentId: number) {
    return this.handinWebService.getHandinsByCommitmentId(commitmentId);
  }

}
