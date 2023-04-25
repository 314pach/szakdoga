export class CommitmentDto {
  public readonly id: number | null;
  public readonly points: number;
  public readonly status: string;
  public readonly deadline: Date;
  public readonly taskId: number;
  public readonly studentIds: number[];
  public readonly badgeIds: number[];

  constructor(id: number | null, points: number, status: string, deadline: Date, taskId: number, studentIds: number[], badgeIds: number[]) {
    this.id = id;
    this.points = points;
    this.status = status;
    this.deadline = deadline;
    this.taskId = taskId;
    this.studentIds = studentIds;
    this.badgeIds = badgeIds;
  }
}
