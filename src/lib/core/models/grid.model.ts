export class GridModel {
  constructor(
    public id: string,
    public cells: any
  ) {}

  public static get empty(): GridModel {
    return new GridModel('NONE', []);
  }
}
