import { CellModel } from './cell.model';
import { MwComponentModel } from '../interfaces';

export class GridModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public cells: CellModel[] = [],
    public backgroundColor: string = ''
  ) {}

  public static get empty(): GridModel {
    return new GridModel();
  }
}
