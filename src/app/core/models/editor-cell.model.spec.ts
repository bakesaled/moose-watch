import { CellModel } from '../../../lib/core/models/cell.model';
import { EditorCellModel } from './editor-cell.model';
import { MwCellComponent } from '../../../lib/grid/cell/cell.component';

describe('EditorCellModel', () => {
  const model = new EditorCellModel();

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should convert CellModel to EditorCellModel', () => {
    const cellModel = new CellModel();
    const result = model.toEditorModel(cellModel);
    expect(result.id).toBe(cellModel.id);
    expect(result.backgroundColor).toBe(cellModel.backgroundColor);
    expect(result.component).toBeNull();
  });

  it('should convert EditorCellModel to CellModel', () => {
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.backgroundColor).toBe(model.backgroundColor);
    expect(result.component).toBe(model.component);
    expect(result.type).toBe(MwCellComponent.name);
  });
});
