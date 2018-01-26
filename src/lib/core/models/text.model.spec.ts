import { TextModel } from './text.model';

describe('TextModel', () => {
  const model = new TextModel();

  it('should be created', () => {
    expect(model).toBeTruthy();
    expect(model.fontStyle).toBe('normal');
    expect(model.fontWeight).toBe('400');
    expect(model.fontSize).toBe('inherit');
    expect(model.color).toBe('inherit');
  });
});
