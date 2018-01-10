import { MwComponentModel } from '../../../lib/core/interfaces/mw-component.model';

export interface MwEditorComponentModel extends MwComponentModel {
  toEditorModel(viewModel: MwComponentModel): MwEditorComponentModel;
}
