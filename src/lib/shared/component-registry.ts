import { Type } from '@angular/core';
import { MwGridComponent } from '../grid/index';
import { NoComponent } from '../no.component';
import { MwCellComponent } from '../grid/cell';
import { MwTextComponent } from '../text';

export const componentRegistry: Array<Type<any>> = [
  NoComponent,
  MwGridComponent,
  MwCellComponent,
  MwTextComponent
];
