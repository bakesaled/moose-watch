import { MwComponentModel } from '../../../lib/core/interfaces/mw-component.model';

export interface MwEditorComponentModel extends MwComponentModel {
  name: string;
  icon: string;
  toEditorModel(viewModel: MwComponentModel): MwEditorComponentModel;
  toViewerModel(): MwComponentModel;
}
