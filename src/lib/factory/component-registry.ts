import { MwNoComponent } from '../no-component/no.component';
import { MwGridComponent } from '../grid/grid.component';
import { MwCellComponent } from '../grid/cell/cell.component';
import { MwTextComponent } from '../text/text.component';
import { Type } from '@angular/core';

export class MwComponentRegistry {
  private static readonly builtIn: any = {
    MwNoComponent: MwNoComponent,
    MwGridComponent: MwGridComponent,
    MwCellComponent: MwCellComponent,
    MwTextComponent: MwTextComponent
  };

  static custom: any;

  static getType<T>(key: string): Type<T> {
    let type = MwComponentRegistry.builtIn[key];
    if (!type && MwComponentRegistry.custom) {
      type = MwComponentRegistry.custom[key];
    }
    return type;
  }
}
