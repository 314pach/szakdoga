import { Injectable } from '@angular/core';
import {BadgeWebService} from "./api/badge-web.service";
import {BadgeDto} from "../dto/badge.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private badgeWebService: BadgeWebService) { }

  getAllBadges() {
    return this.badgeWebService.getAllBadges();
  }

  getBadgesByIds(badgeIds: number[]) : Observable<BadgeDto[]> {
    return this.badgeWebService.getBadgesByIds(badgeIds);
  }
}
