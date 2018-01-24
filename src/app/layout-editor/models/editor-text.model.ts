import { TextModel } from '../../../lib/core/models/text.model';
import { MwEditorComponentModel } from '../../core/interfaces';
import { MwTextComponent } from '../../../lib/text/text.component';
import { Guid } from '../../core/utils';

export class EditorTextModel implements MwEditorComponentModel {
  constructor(
    public id: string = Guid.create(),
    public value: string = '[text]',
    public name: string = 'Text',
    public type: string = 'MwEditorTextComponent',
    public icon: string = 'text_fields',
    public fontStyle: 'normal' | 'italic' = 'normal',
    public fontWeight: '400' | '900' = '400'
  ) {}

  toEditorModel(textModel: TextModel): EditorTextModel {
    this.id = textModel.id;
    this.value = textModel.value;
    this.fontStyle = textModel.fontStyle;
    this.fontWeight = textModel.fontWeight;
    return this;
  }

  toViewerModel(): TextModel {
    const textModel = new TextModel(this.id, this.value);
    textModel.type = 'MwTextComponent';
    textModel.fontStyle = this.fontStyle;
    textModel.fontWeight = this.fontWeight;
    return textModel;
  }
}
