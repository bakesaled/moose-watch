import { TextModel } from '../../../lib/core/models/text.model';
import { MwEditorComponentModel } from '../interfaces/';
import { MwTextComponent } from '../../../lib/text/text.component';
import { Guid } from '../utils';

export class EditorTextModel implements MwEditorComponentModel {
  constructor(
    public id: string = Guid.create(),
    public value: string = '[text]',
    public type: string = 'MwEditorTextComponent'
  ) {}

  toEditorModel(textModel: TextModel): EditorTextModel {
    this.id = textModel.id;
    this.value = textModel.value;
    return this;
  }

  toViewerModel(): TextModel {
    const textModel = new TextModel(this.id, this.value);
    textModel.type = MwTextComponent.name;
    return textModel;
  }
}
