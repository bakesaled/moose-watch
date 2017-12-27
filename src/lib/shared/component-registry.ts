import { Type } from '@angular/core';
import { MwNoComponent } from '../no-component/no.component';
import { MwCellComponent } from '../grid/cell';
import { MwTextComponent } from '../text';
import { MwGridComponent } from '../grid';

export const componentRegistry: Array<Type<any>> = [
  MwNoComponent,
  MwGridComponent,
  MwCellComponent,
  MwTextComponent
];
