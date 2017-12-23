import { GridModel } from './grid.model';
import { MwComponentModel } from '../interfaces';

export class LayoutModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public grid: GridModel = GridModel.empty
  ) {}

  public static get empty(): LayoutModel {
    return new LayoutModel();
  }
}
