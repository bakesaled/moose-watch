import { GridModel } from './grid.model';
import { Type } from '@angular/core';
import { MwComponentModel } from '../interfaces/mw-component.model';
import { MwNoComponent } from '../../no-component/no.component';
import { LayoutRetrievalStrategy } from '../../layout/layout-retrieval-strategy';

export class LayoutModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public name: string = 'NO_NAME',
    public retrievalStrategy: LayoutRetrievalStrategy = LayoutRetrievalStrategy.fileSystem,
    public grid: GridModel = new GridModel(),
    public type: Type<any> = MwNoComponent
  ) {}
}
