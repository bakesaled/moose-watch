import { EditorGridModel } from './editor-grid.model';
import { GridModel } from '../../../lib/core/models/grid.model';
import { MwGridComponent } from '../../../lib/grid/grid.component';

describe('EditorGridModel', () => {
  const model = new EditorGridModel();

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should convert GridModel to EditorGridModel', () => {
    const gridModel = new GridModel();
    const result = model.toEditorModel(gridModel);
    expect(result.id).toBe(gridModel.id);
    expect(result.backgroundColor).toBe(gridModel.backgroundColor);
    expect(result.cells.length).toBe(gridModel.cells.length);
  });

  it('should convert EditorGridModel to GridModel', () => {
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.backgroundColor).toBe(model.backgroundColor);
    expect(result.cells.length).toBe(model.cells.length);
    expect(result.type).toBe(MwGridComponent.name);
  });
});
