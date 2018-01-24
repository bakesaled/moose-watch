import { MwComponentModel } from '../interfaces/mw-component.model';
import { MwNoComponent } from '../../no-component/no.component';

export class TextModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public value: string = '',
    public type: string = MwNoComponent.name,
    public fontStyle: 'normal' | 'italic' = 'normal',
    public fontWeight: '400' | '900' = '400'
  ) {}
}
