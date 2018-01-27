import { CellModel } from '../../../lib/core/models/cell.model';
import { EditorCellModel } from './editor-cell.model';
import { MwCellComponent } from '../../../lib/grid/cell/cell.component';
import { MockEditorComponentModel } from '../../core/mocks/editor-component-model.mock';
import { MockComponentModel } from '../../core/mocks/component-model.mock';
import { throwIfAlreadyLoaded } from '../../core/module-import-guard';
import { TextModel } from '../../../lib/core/models/text.model';

describe('EditorCellModel', () => {
  let model: EditorCellModel;
  beforeEach(() => {
    model = new EditorCellModel();
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should convert CellModel to EditorCellModel', () => {
    const cellModel = new CellModel();
    cellModel.width = 30;
    const result = model.toEditorModel(cellModel);
    expect(result.id).toBe(cellModel.id);
    expect(result.backgroundColor).toBe(cellModel.backgroundColor);
    expect(result.component).toBeNull();
    expect(result.width).toBe(cellModel.width);
  });

  it('should throw error if component type is not valid', () => {
    const cellModel = new CellModel();
    cellModel.component = new MockComponentModel();
    expect(function() {
      model.toEditorModel(cellModel);
    }).toThrowError(
      `Component type '${cellModel.component.type}' is not supported by cell.`
    );
  });

  it('should convert EditorCellModel to CellModel', () => {
    model.width = 60;
    model.component = new MockEditorComponentModel();
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.backgroundColor).toBe(model.backgroundColor);
    expect(result.component.id).toBe(model.component.id);
    expect(result.width).toBe(model.width);
    expect(result.type).toBe(MwCellComponent.name);
  });
});
