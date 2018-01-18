import { LayoutModel } from '../../../lib/core/models/layout.model';
import { EditorLayoutModel } from './editor-layout.model';
import { MwLayoutComponent } from '../../../lib/layout/layout.component';
import { GridModel } from '../../../lib/core/models/grid.model';
import { EditorGridModel } from './editor-grid.model';
import { MwGridComponent } from '../../../lib/grid/grid.component';
import { EditorCellModel } from './editor-cell.model';

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
    expect(result.component).toBeNull();
    expect(result.isNew).toBe(layoutModel.isNew);
  });

  it('should convert LayoutModel with grid to EditorLayoutModel', () => {
    const layoutModel = new LayoutModel();
    layoutModel.isNew = false;
    const gridModel = new GridModel();
    layoutModel.component = gridModel;
    layoutModel.component.type = MwGridComponent.name;
    const result = model.toEditorModel(layoutModel);
    expect(result.id).toBe(layoutModel.id);
    const expectedEditorGridModel = new EditorGridModel(
      gridModel.id,
      [new EditorCellModel('NONE'), new EditorCellModel('NONE')],
      gridModel.backgroundColor,
      'MwEditorGridComponent',
      'Grid',
      'grid_on'
    );
    expect(result.component).toEqual(expectedEditorGridModel);
    expect(result.isNew).toBe(layoutModel.isNew);
  });

  it('should convert EditorLayoutModel to LayoutModel', () => {
    model.component = new EditorGridModel();
    const result = model.toViewerModel();
    expect(result.id).toBe(model.id);
    expect(result.component).toEqual(
      new GridModel(model.component.id, [], '', MwGridComponent.name)
    );
    expect(result.type).toBe(MwLayoutComponent.name);
    expect(result.isNew).toBe(model.isNew);
  });
});
