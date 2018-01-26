import { TextModel } from '../../../lib/core/models/text.model';
import { EditorTextModel } from './editor-text.model';
import { MwTextComponent } from '../../../lib/text/text.component';

describe('EditorTextModel', () => {
  const model = new EditorTextModel();

  it('should be created', () => {
    expect(model).toBeTruthy();
    expect(model.fontStyle).toBe('normal');
    expect(model.fontWeight).toBe('400');
    expect(model.fontSize).toBe('inherit');
  });

  it('should convert TextModel to EditorTextModel', () => {
    const textModel = new TextModel();
    textModel.fontStyle = 'italic';
    textModel.fontWeight = '900';
    textModel.fontSize = '12px';
    const result = model.toEditorModel(textModel);
    expect(result.id).toBe(textModel.id);
    expect(result.value).toBe(textModel.value);
    expect(result.fontStyle).toBe('italic');
    expect(result.fontWeight).toBe('900');
    expect(result.fontSize).toBe('12px');
  });

  it('should convert EditorTextModel to TextModel', () => {
    model.fontStyle = 'italic';
    model.fontWeight = '900';
    model.fontSize = '12px';
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.value).toBe(model.value);
    expect(result.type).toBe(MwTextComponent.name);
    expect(result.fontStyle).toBe('italic');
    expect(result.fontWeight).toBe('900');
    expect(result.fontSize).toBe('12px');
  });
});
