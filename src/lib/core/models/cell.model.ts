export class CellModel {
  constructor(
    public id: string,
    public width: number
  ) {}

  public static get empty(): CellModel {
    return new CellModel('NONE', 0);
  }
}
