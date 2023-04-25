import {RoleEnum} from "../enum/role.enum";

export class ApplicationUserDto {
  public readonly id: number | null;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly role: RoleEnum;
  public readonly profilePictureId: number | null;
  public readonly classRoomIds: Set<number>;
  public readonly commitmentIds: Set<number>;


  constructor(
    id: number | null,
    name: string,
    email: string,
    password: string,
    role: RoleEnum,
    profilePictureId: number | null,
    classRoomIds: Set<number>,
    commitmentIds: Set<number>
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.profilePictureId = profilePictureId;
    this.classRoomIds = classRoomIds;
    this.commitmentIds = commitmentIds;
  }
}
