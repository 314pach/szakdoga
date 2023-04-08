export class HandinDto {
  public readonly id: number | null;
  public readonly path: string;
  public readonly timestamp: Date;
  public readonly fileId: number;
  public readonly commitmentId: number;
  public readonly uploaderId: number;

  constructor(
    id: number | null,
    path: string,
    timestamp: Date,
    fileId: number,
    commitmentId: number,
    uploaderId: number
  ) {
    this.id = id;
    this.path = path;
    this.timestamp = timestamp;
    this.fileId = fileId;
    this.commitmentId = commitmentId;
    this.uploaderId = uploaderId;
  }
}
