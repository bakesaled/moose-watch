import { MwEditorComponentModel } from '../interfaces';
import { MwComponentModel } from '../../../lib/core/interfaces/mw-component.model';

export class MockEditorComponentModel implements MwEditorComponentModel {
  constructor(
    public id: string = 'testId',
    public type: string = '',
    public name: string = 'mock',
    public icon: string = 'mock_icon'
  ) {}

  toEditorModel(model: MwComponentModel) {
    return this;
  }
  toViewerModel() {
    return {
      id: this.id,
      type: this.type
    };
  }
}
