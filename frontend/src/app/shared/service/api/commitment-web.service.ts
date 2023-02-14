import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {CommitmentDto} from "../../dto/commitment.dto";

@Injectable({
  providedIn: 'root'
})
export class CommitmentWebService {

  private specificUrl: string = "commitment/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  getAllCommitments(): Observable<CommitmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindAll);
    return this.http.get<CommitmentDto[]>(fullPath);
  }

  getCommitmentById(commitmentId: number): Observable<CommitmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + commitmentId;
    return this.http.get<CommitmentDto>(fullPath);
  }

  createCommitment(commitment: CommitmentDto): Observable<CommitmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<CommitmentDto>(fullPath, commitment);
  }

  updateCommitment(commitment: CommitmentDto): Observable<CommitmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<CommitmentDto>(fullPath, commitment);
  }

  deleteCommitment(commitmentId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + commitmentId;
    return this.http.delete<any>(fullPath);
  }
}
