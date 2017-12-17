import { GridModel } from './grid.model';

export class LayoutModel {
  constructor(
    public id: string,
    public grid: GridModel
  ) {}

  public static get empty(): LayoutModel {
    return new LayoutModel('NONE', GridModel.empty);
  }
}
