import { CellModel } from './cell.model';
import { Type } from '@angular/core';
import { MwComponentModel } from '../interfaces/mw-component.model';
import { MwNoComponent } from '../../no-component/no.component';

export class GridModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public cells: CellModel[] = [new CellModel(), new CellModel()],
    public backgroundColor: string = '',
    public type: Type<any> = MwNoComponent
  ) {}
}
