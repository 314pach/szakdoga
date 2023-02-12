export class ClassroomDto {
  public readonly id: number | null;
  public readonly name: string;
  public readonly subject: string;
  public readonly modulIds: Set<number>;
  public readonly applicationUserIds: Set<number>;

  constructor(
    id: number | null,
    name: string,
    subject: string,
    modulIds: Set<number>,
    applicationUserIds: Set<number>
  ) {
    this.id = id;
    this.name = name;
    this.subject = subject;
    this.modulIds = modulIds;
    this.applicationUserIds = applicationUserIds;
  }
}
