import {AttachmentTypeEnum} from "../enum/attachment-type.enum";

export class AttachmentDto {
  public readonly id: number | null;
  public readonly path: string;
  public readonly type: AttachmentTypeEnum;
  public readonly taskId: number;
  public readonly uploaderId: number;

  constructor(
    id: number | null,
    path: string,
    type: AttachmentTypeEnum,
    taskId: number,
    uploaderId: number
  ) {
    this.id = id;
    this.path = path;
    this.type = type;
    this.taskId = taskId;
    this.uploaderId = uploaderId;
  }
}
