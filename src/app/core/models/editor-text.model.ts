import { TextModel } from '../../../lib/core/models/text.model';
import { MwEditorComponentModel } from '../interfaces/mw-editor-component.model';

export class EditorTextModel implements MwEditorComponentModel {
  constructor(
    public id: string = 'NONE',
    public value: string = '',
    public type: string = 'MwEditorTextComponent'
  ) {}

  toEditorModel(textModel: TextModel): EditorTextModel {
    this.id = textModel.id;
    this.value = textModel.value;
    return this;
  }
}
