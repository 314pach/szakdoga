import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiPathEnum} from "../../enum/api-path.enum";
import {environment} from "../../../../environments/environment";
import {RegisterRequestDto} from "../../dto/register-request.dto";
import {AuthenticationResponseDto} from "../../dto/authentication-response.dto";
import {catchError, Observable} from "rxjs";
import {LoginRequestDto} from "../../dto/login-request.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationWebService {
  private specificUrl: string = "authentication/";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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
    return this.http.get<void>(fullPath, {headers: this.createHeader()})
      .pipe(
        catchError(err => {
          if(err.status === 403) {
            localStorage.clear();
            this.router.navigateByUrl("authentication/login");
            throw "Authentication error";
          }
          throw err;
        })
      );
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
