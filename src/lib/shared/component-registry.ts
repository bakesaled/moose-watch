import { Type } from '@angular/core';
import { NoComponent } from '../no.component';
import { MwCellComponent } from '../grid/cell';
import { MwTextComponent } from '../text';
import { MwGridComponent } from '../grid';

export const componentRegistry: Array<Type<any>> = [
  NoComponent,
  MwGridComponent,
  MwCellComponent,
  MwTextComponent
];
