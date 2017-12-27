import { MwComponentModel } from '../interfaces';
import { Type } from '@angular/core';
import { MwNoComponent } from '../../no-component/no.component';

export class TextModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public value: string = '',
    public type: Type<any> = MwNoComponent
  ) {}
}
