import { Injectable } from '@angular/core';
import {CommitmentWebService} from "./api/commitment-web.service";
import {BehaviorSubject} from "rxjs";
import {CommitmentDto} from "../dto/commitment.dto";

@Injectable({
  providedIn: 'root'
})
export class CommitmentService {
  commitmentsByModulSubject: BehaviorSubject<CommitmentDto[]> = new BehaviorSubject<CommitmentDto[]>([]);

  constructor(private commitmentWebService: CommitmentWebService) { }

  getCommitmentsByUserAndModul(userId: number, taskIds: number[]) {
    this.commitmentWebService.getCommitmentsByUserAndModul(userId, taskIds)
      .subscribe(
        commitments => this.commitmentsByModulSubject.next(commitments)
      );
  }

  createCommitment(commitment: CommitmentDto) {
    return this.commitmentWebService.createCommitment(commitment);
  }

  createCommitments(commitments: CommitmentDto[]) {
    return this.commitmentWebService.createCommitments(commitments);
  }

  deleteCommitment(commitmentId: number) {
    return this.commitmentWebService.deleteCommitment(commitmentId);
  }

  deleteCommitments(ids: number[]){
    return this.commitmentWebService.deleteCommitmentsById(ids);
  }
}
