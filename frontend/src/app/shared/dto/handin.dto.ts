export class HandinDto {
  public readonly id: number | null;
  public readonly path: string;
  public readonly timestamp: Date;
  public readonly commimentId: number; // todo elirtam
  public readonly uploaderId: number;

  constructor(
    id: number | null,
    path: string,
    timestamp: Date,
    commimentId: number,
    uploaderId: number
  ) {
    this.id = id;
    this.path = path;
    this.timestamp = timestamp;
    this.commimentId = commimentId;
    this.uploaderId = uploaderId;
  }
}
