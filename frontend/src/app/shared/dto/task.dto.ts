export class TaskDto {
  public readonly id: number | null;
  public readonly title: string;
  public readonly summary: string;
  public readonly description: string;
  public readonly points: number;
  public readonly teamwork: boolean;
  public readonly headcount: number;
  public readonly modulId: number;

  constructor(
    id: number | null,
    title: string,
    summary: string,
    description: string,
    points: number,
    teamwork: boolean,
    headcount: number,
    modulId: number
  ) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.description = description;
    this.points = points;
    this.teamwork = teamwork;
    this.headcount = headcount;
    this.modulId = modulId;
  }
}
