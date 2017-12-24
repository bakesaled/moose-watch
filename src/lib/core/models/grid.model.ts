import { CellModel } from './cell.model';
import { MwComponentModel } from '../interfaces';
import { Type } from '@angular/core';
import { NoComponent } from '../../no.component';

export class GridModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public cells: CellModel[] = [CellModel.empty, CellModel.empty],
    public backgroundColor: string = '',
    public type: Type<any> = NoComponent
  ) {}

  public static get empty(): GridModel {
    return new GridModel();
  }
}
