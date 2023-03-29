import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {RegisterRequestDto} from "../../dto/register-request.dto";
import {AuthenticationResponseDto} from "../../dto/authentication-response.dto";
import {Observable} from "rxjs";
import {LoginRequestDto} from "../../dto/login-request.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationWebService {
  private specificUrl: string = "authentication/";

  constructor(private http: HttpClient) { }

  private buildFullPath(path: ApiPathEnum): string {
    return environment.apiBaseUrl + this.specificUrl + path;
  }

  register(newUser: RegisterRequestDto): Observable<AuthenticationResponseDto>{
    let fullPath = this.buildFullPath(ApiPathEnum.Register);
    return this.http.post<AuthenticationResponseDto>(fullPath, newUser);
  }

  login(user: LoginRequestDto): Observable<AuthenticationResponseDto>{
    let fullPath = this.buildFullPath(ApiPathEnum.Login);
    return this.http.post<AuthenticationResponseDto>(fullPath, user);
  }

  logout(): Observable<void>{
    let fullPath = this.buildFullPath(ApiPathEnum.Logout);
    return this.http.get<void>(fullPath, {headers: this.createHeader()});
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
