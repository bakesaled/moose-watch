import { EditorGridModel } from './editor-grid.model';
import { GridModel } from '../../../lib/core/models/grid.model';
import { MwGridComponent } from '../../../lib/grid/grid.component';
import { EditorCellModel } from './editor-cell.model';
import { MockEditorComponentModel } from '../../core/mocks/editor-component-model.mock';

describe('EditorGridModel', () => {
  let model: EditorGridModel;

  beforeEach(() => {
    model = new EditorGridModel();
  });

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

  it('should remove last cell if empty', () => {
    model.cells.push(new EditorCellModel());
    model.cells.push(new EditorCellModel());
    expect(model.cells.length).toBe(2);
    model.removeCell();
    expect(model.cells.length).toBe(1);
  });

  it('should not remove last cell if not empty', () => {
    model.cells.push(new EditorCellModel());
    model.cells.push(new EditorCellModel());
    model.cells[1].component = new MockEditorComponentModel();
    expect(model.cells.length).toBe(2);
    model.removeCell();
    expect(model.cells.length).toBe(2);
  });

  it('should not remove last cell if array length === 1', () => {
    model.cells.push(new EditorCellModel());
    expect(model.cells.length).toBe(1);
    model.removeCell();
    expect(model.cells.length).toBe(1);
  });

  it('should add empty cell to end of array', () => {
    expect(model.cells.length).toBe(0);
    model.addCell();
    expect(model.cells.length).toBe(1);
  });

  it('should not add cell to end of array if array length === max', () => {
    while (model.cells.length < EditorGridModel.maxCellCount) {
      model.cells.push(new EditorCellModel());
    }
    expect(model.cells.length).toBe(8);
    model.addCell();
    expect(model.cells.length).toBe(8);
  });

  it('should increase cell count by two', () => {
    expect(model.cells.length).toBe(0);
    model.changeCellCount(2);
    expect(model.cells.length).toBe(2);
  });

  it('should decrease cell count by two', () => {
    model.cells.push(new EditorCellModel());
    model.cells.push(new EditorCellModel());
    model.cells.push(new EditorCellModel());
    expect(model.cells.length).toBe(3);
    model.changeCellCount(1);
    expect(model.cells.length).toBe(1);
  });

  it('should return false when changeing cell count to zero', () => {
    const result = model.changeCellCount(0);
    expect(result).toBeFalsy();
  });

  it('should return false when changeing cell count to > than max', () => {
    const result = model.changeCellCount(9);
    expect(result).toBeFalsy();
  });

  it('should remove 6 cells', () => {
    while (model.cells.length < EditorGridModel.maxCellCount) {
      model.cells.push(new EditorCellModel());
    }
    expect(model.cells.length).toBe(8);
    model.changeCellCount(2);
    expect(model.cells.length).toBe(2);
  });

  it('should return false when at least one cell is empty', () => {
    model.cells.push(new EditorCellModel());
    model.cells.push(new EditorCellModel());
    model.cells[1].component = new MockEditorComponentModel();
    const result = model.cellsAreFull();
    expect(result).toBeFalsy();
  });

  it('should return true when all cells are full', () => {
    model.cells.push(new EditorCellModel());
    model.cells.push(new EditorCellModel());
    model.cells[0].component = new MockEditorComponentModel();
    model.cells[1].component = new MockEditorComponentModel();
    const result = model.cellsAreFull();
    expect(result).toBeTruthy();
  });
});
