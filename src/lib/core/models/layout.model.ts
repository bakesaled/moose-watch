import { GridModel } from './grid.model';
import { MwComponentModel } from '../interfaces';
import { Type } from '@angular/core';
import { MwNoComponent } from '../../no-component/no.component';

export class LayoutModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public grid: GridModel = new GridModel(),
    public type: Type<any> = MwNoComponent
  ) {}
}
