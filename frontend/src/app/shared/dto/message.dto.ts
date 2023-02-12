export class MessageDto {
  public readonly id: number | null;
  public readonly timestamp: Date;
  public readonly body: string;
  public readonly status: string;
  public readonly labels: string;
  public readonly senderId: number;
  public readonly receiverId: number;

  constructor(
    id: number | null,
    timestamp: Date,
    body: string,
    status: string,
    labels: string,
    senderId: number,
    receiverId: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.body = body;
    this.status = status;
    this.labels = labels;
    this.senderId = senderId;
    this.receiverId = receiverId;
  }
}
