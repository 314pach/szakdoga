export class AttachmentDto {
  public readonly id: number | null;
  public readonly path: string;
  public readonly taskId: number;
  public readonly uploaderId: number;

  constructor(
    id: number | null,
    path: string,
    taskId: number,
    uploaderId: number
  ) {
    this.id = id;
    this.path = path;
    this.taskId = taskId;
    this.uploaderId = uploaderId;
  }
}
