import { Injectable } from '@angular/core';
import {HandinWebService} from "./api/handin-web.service";

@Injectable({
  providedIn: 'root'
})
export class HandinService {

  constructor(private handinWebService: HandinWebService) { }
}
