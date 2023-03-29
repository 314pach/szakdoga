import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.get<CommitmentDto[]>(fullPath, {headers: this.createHeader()});
  }

  getCommitmentById(commitmentId: number): Observable<CommitmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindById) + commitmentId;
    return this.http.get<CommitmentDto>(fullPath, {headers: this.createHeader()});
  }

  getCommitmentsByUserAndModul(userId: number, taskIds: number[]): Observable<CommitmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.FindCommitmentsByUserAndModul) + userId;
    return this.http.post<CommitmentDto[]>(fullPath, taskIds, {headers: this.createHeader()});
  }

  createCommitment(commitment: CommitmentDto): Observable<CommitmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Create);
    return this.http.post<CommitmentDto>(fullPath, commitment, {headers: this.createHeader()});
  }

  createCommitments(commitments: CommitmentDto[]): Observable<CommitmentDto[]> {
    let fullPath = this.buildFullPath(ApiPathEnum.CreateAll);
    return this.http.post<CommitmentDto[]>(fullPath, commitments, {headers: this.createHeader()});
  }

  updateCommitment(commitment: CommitmentDto): Observable<CommitmentDto> {
    let fullPath = this.buildFullPath(ApiPathEnum.Update);
    return this.http.put<CommitmentDto>(fullPath, commitment, {headers: this.createHeader()});
  }

  deleteCommitment(commitmentId: number): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.Delete) + commitmentId;
    return this.http.delete<any>(fullPath, {headers: this.createHeader()});
  }

  deleteCommitmentsById(commitmentIds: number[]): Observable<any> {
    let fullPath = this.buildFullPath(ApiPathEnum.DeleteCommitmentsById);
    return this.http.post<any>(fullPath, commitmentIds, {headers: this.createHeader()});
  }

  createHeader(): HttpHeaders {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }
}
