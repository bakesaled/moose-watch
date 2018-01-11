import { GridModel } from './grid.model';
import { MwComponentModel } from '../interfaces/mw-component.model';
import { MwNoComponent } from '../../no-component/no.component';

export class LayoutModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public name: string = 'NO_NAME',
    public isNew: boolean = true,
    public grid: GridModel = new GridModel(),
    public type: string = MwNoComponent.name
  ) {}
}
