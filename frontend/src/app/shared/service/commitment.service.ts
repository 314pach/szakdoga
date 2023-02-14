import { Injectable } from '@angular/core';
import {CommitmentWebService} from "./api/commitment-web.service";

@Injectable({
  providedIn: 'root'
})
export class CommitmentService {

  constructor(private commitmentWebService: CommitmentWebService) { }
}
