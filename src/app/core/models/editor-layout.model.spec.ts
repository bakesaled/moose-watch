import { LayoutModel } from '../../../lib/core/models/layout.model';
import { EditorLayoutModel } from './editor-layout.model';
import { MwLayoutComponent } from '../../../lib/layout/layout.component';
import { GridModel } from '../../../lib/core/models/grid.model';

describe('EditorLayoutModel', () => {
  const model = new EditorLayoutModel();

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should convert LayoutModel to EditorLayoutModel', () => {
    const layoutModel = new LayoutModel();
    const result = model.toEditorModel(layoutModel);
    expect(result.id).toBe(layoutModel.id);
    expect(result.grid).toBeNull();
  });

  it('should convert EditorLayoutModel to LayoutModel', () => {
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.grid).toEqual(new GridModel());
    expect(result.type).toBe(MwLayoutComponent.name);
  });
});
