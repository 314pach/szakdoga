import { Injectable } from '@angular/core';
import {BadgeWebService} from "./api/badge-web.service";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private badgeWebService: BadgeWebService) { }
}
