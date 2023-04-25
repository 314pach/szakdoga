export class BadgeDto {
  public readonly id: number | null;
  public readonly tooltip: string;
  public readonly icon: string;

  constructor(
    id: number | null,
    tooltip: string,
    icon: string
  ) {
    this.id = id;
    this.tooltip = tooltip;
    this.icon = icon;
  }
}
