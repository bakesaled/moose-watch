import { GridModel } from './grid.model';
import { MwComponentModel } from '../interfaces';
import { Type } from '@angular/core';
import { NoComponent } from '../../no.component';

export class LayoutModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public grid: GridModel = GridModel.empty,
    public type: Type<any> = NoComponent
  ) {}

  public static get empty(): LayoutModel {
    return new LayoutModel();
  }
}
