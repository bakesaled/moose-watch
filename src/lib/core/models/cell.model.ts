export class CellModel {
  constructor(
    public id: string = 'NONE',
    public width: number = 0,
    public backgroundColor?: string,
    public margin: number = 0
  ) {}

  public static get empty(): CellModel {
    return new CellModel();
  }
}
