import { MwComponentModel } from '../interfaces';
import { Type } from '@angular/core';
import { NoComponent } from '../../no.component';

export class TextModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public value: string = '',
    public type: Type<any> = NoComponent
  ) {}

  public static get empty(): TextModel {
    return new TextModel();
  }
}
