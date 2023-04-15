export class ModulDto {
  public readonly id: number | null;
  public readonly deleted: boolean;
  public readonly title: string;
  public readonly beginning: Date;
  public readonly end: Date;
  public readonly pointsFor2: number;
  public readonly pointsFor3: number;
  public readonly pointsFor4: number;
  public readonly pointsFor5: number;
  public readonly bannerPath: string;
  public readonly creatorId: number;
  public readonly classRoomIds: number[];

  constructor(
    id: number | null,
    deleted: boolean,
    title: string,
    beginning: Date,
    end: Date,
    pointsFor2: number,
    pointsFor3: number,
    pointsFor4: number,
    pointsFor5: number,
    bannerPath: string,
    creatorId: number,
    classRoomIds: number[]
  ) {
    this.id = id;
    this.deleted = deleted;
    this.title = title;
    this.beginning = beginning;
    this.end = end;
    this.pointsFor2 = pointsFor2;
    this.pointsFor3 = pointsFor3;
    this.pointsFor4 = pointsFor4;
    this.pointsFor5 = pointsFor5;
    this.bannerPath = bannerPath;
    this.creatorId = creatorId;
    this.classRoomIds = classRoomIds;
  }
}
