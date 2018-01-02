import { Type } from '@angular/core';
import { MwNoComponent } from '../no-component/no.component';
import { MwGridComponent } from '../grid/grid.component';
import { MwCellComponent } from '../grid/cell/cell.component';
import { MwTextComponent } from '../text/text.component';

export const componentRegistry: Array<Type<any>> = [
  MwNoComponent,
  MwGridComponent,
  MwCellComponent,
  MwTextComponent
];
