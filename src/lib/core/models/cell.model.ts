import { MwComponentModel } from '../interfaces/mw-component.model';
import { MwNoComponent } from '../../no-component/no.component';

export class CellModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public width: number = 0,
    public backgroundColor?: string,
    public margin: number = 0,
    public type: string = MwNoComponent.name,
    public component: MwComponentModel = null
  ) {}
}
