import { Type } from '@angular/core';
import { MwNoComponent } from '../no-component/no.component';
import { MwCellComponent } from '../grid/cell/index';
import { MwTextComponent } from '../text/index';
import { MwGridComponent } from '../grid/index';

export const componentRegistry: Array<Type<any>> = [
  MwNoComponent,
  MwGridComponent,
  MwCellComponent,
  MwTextComponent
];
