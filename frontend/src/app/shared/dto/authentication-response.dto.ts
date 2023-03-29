import {ApplicationUserDto} from "./application-user.dto";

export class AuthenticationResponseDto {
  public readonly token: string;
  public readonly applicationUser: ApplicationUserDto;

  constructor(
    token: string,
    applicationUser: ApplicationUserDto
  ) {
    this.token = token;
    this.applicationUser = applicationUser;
  }
}
