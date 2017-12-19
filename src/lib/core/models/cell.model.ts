export class CellModel {
  constructor(
    public id: string = 'NONE',
    public width: number = 0,
    public backgroundColor?: string,
    public margin: number = 0,
    public editMode: boolean = false
  ) {}

  public static get empty(): CellModel {
    return new CellModel();
  }

  public static get emptyEdit(): CellModel {
    const model = new CellModel();
    model.editMode = true;
    return model;
  }
}
