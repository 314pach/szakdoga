import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileWebService {

  private specificUrl: string = "file/";
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  uploadFile(file: File): Observable<number> {
    let fullpath = this.buildFullPath(ApiPathEnum.UploadFile);
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<number>(fullpath, formData, {headers: this.createHeader()});
  }

  getFile(fileId: number): Observable<Blob> {
    let fullPath = this.buildFullPath(ApiPathEnum.GetFiles) + fileId;
    // @ts-ignore
    return this.http.get<Blob>(fullPath, {headers: this.createHeader(), responseType: "blob"});
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
