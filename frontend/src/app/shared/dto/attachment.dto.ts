import {AttachmentTypeEnum} from "../enum/attachment-type.enum";

export class AttachmentDto {
  public readonly id: number | null;
  public readonly path: string;
  public readonly type: AttachmentTypeEnum;
  public readonly taskId: number;
  public readonly uploaderId: number;
  public readonly fileId: number | null;

  constructor(
    id: number | null,
    path: string,
    type: AttachmentTypeEnum,
    taskId: number,
    uploaderId: number,
    fileId: number | null
  ) {
    this.id = id;
    this.path = path;
    this.type = type;
    this.taskId = taskId;
    this.uploaderId = uploaderId;
    this.fileId = fileId;
  }
}
