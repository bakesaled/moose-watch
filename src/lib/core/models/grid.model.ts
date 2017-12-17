import { CellModel } from './cell.model';

export class GridModel {
  constructor(
    public id: string = 'NONE',
    public cells: CellModel[] = [],
    public backgroundColor: string = ''
  ) {}

  public static get empty(): GridModel {
    return new GridModel();
  }
}
