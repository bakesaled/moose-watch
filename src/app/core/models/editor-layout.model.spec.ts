import { LayoutModel } from '../../../lib/core/models/layout.model';
import { EditorLayoutModel } from './editor-layout.model';
import { MwLayoutComponent } from '../../../lib/layout/layout.component';
import { GridModel } from '../../../lib/core/models/grid.model';
import { forEach } from '@angular/router/src/utils/collection';

describe('EditorLayoutModel', () => {
  let model: EditorLayoutModel;
  beforeEach(() => {
    model = new EditorLayoutModel();
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should convert LayoutModel to EditorLayoutModel', () => {
    const layoutModel = new LayoutModel();
    const result = model.toEditorModel(layoutModel);
    expect(result.id).toBe(layoutModel.id);
    expect(result.grid).toBeNull();
    expect(result.isNew).toBe(layoutModel.isNew);
  });

  it('should convert EditorLayoutModel to LayoutModel', () => {
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.grid).toEqual(new GridModel());
    expect(result.type).toBe(MwLayoutComponent.name);
    expect(result.isNew).toBe(model.isNew);
  });
});
