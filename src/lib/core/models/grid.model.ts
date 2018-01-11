import { CellModel } from './cell.model';
import { MwComponentModel } from '../interfaces/mw-component.model';
import { MwNoComponent } from '../../no-component/no.component';

export class GridModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public cells: CellModel[] = [new CellModel(), new CellModel()],
    public backgroundColor: string = '',
    public type: string = MwNoComponent.name
  ) {}
}
