export class ClassroomDto {
  public readonly id: number | null;
  public readonly name: string;
  public readonly subject: string;
  public readonly commitmentPeriod: boolean;
  public readonly archived: boolean;
  public readonly modulIds: number[];
  public readonly applicationUserIds: number[];

  constructor(
    id: number | null,
    name: string,
    subject: string,
    commitmentPeriod: boolean,
    archived: boolean,
    modulIds: number[],
    applicationUserIds: number[]
  ) {
    this.id = id;
    this.name = name;
    this.subject = subject;
    this.commitmentPeriod = commitmentPeriod;
    this.archived = archived;
    this.modulIds = modulIds;
    this.applicationUserIds = applicationUserIds;
  }
}
