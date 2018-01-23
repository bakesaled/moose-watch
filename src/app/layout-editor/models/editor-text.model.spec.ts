import { TextModel } from '../../../lib/core/models/text.model';
import { EditorTextModel } from './editor-text.model';
import { MwTextComponent } from '../../../lib/text/text.component';

describe('EditorTextModel', () => {
  const model = new EditorTextModel();

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should convert TextModel to EditorTextModel', () => {
    const textModel = new TextModel();
    textModel.fontStyle = 'italic';
    const result = model.toEditorModel(textModel);
    expect(result.id).toBe(textModel.id);
    expect(result.value).toBe(textModel.value);
    expect(result.fontStyle).toBe('italic');
  });

  it('should convert EditorTextModel to TextModel', () => {
    model.fontStyle = 'italic';
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.value).toBe(model.value);
    expect(result.type).toBe(MwTextComponent.name);
    expect(result.fontStyle).toBe('italic');
  });
});
