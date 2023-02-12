export class ApplicationUserDto {
  public readonly id: number | null;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly role: boolean;
  public readonly classRoomIds: Set<number>;
  public readonly commitmentIds: Set<number>;


  constructor(
    id: number | null,
    name: string,
    email: string,
    password: string,
    role: boolean,
    classRoomIds: Set<number>,
    commitmentIds: Set<number>
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.classRoomIds = classRoomIds;
    this.commitmentIds = commitmentIds;
  }
}
