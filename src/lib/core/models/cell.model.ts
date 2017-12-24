import { MwComponentModel } from '../interfaces';
import { Type } from '@angular/core';
import { NoComponent } from '../../no.component';

export class CellModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public width: number = 0,
    public backgroundColor?: string,
    public margin: number = 0,
    public type: Type<any> = NoComponent,
    public component: MwComponentModel = null
  ) {}

  public static get empty(): CellModel {
    return new CellModel();
  }
}
