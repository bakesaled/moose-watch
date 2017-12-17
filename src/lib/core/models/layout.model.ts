import { GridModel } from './grid.model';

export class LayoutModel {
  constructor(
    public id: string = 'NONE',
    public grid: GridModel = GridModel.empty
  ) {}

  public static get empty(): LayoutModel {
    return new LayoutModel();
  }
}
