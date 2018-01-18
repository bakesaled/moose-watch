import { EditorCellModel } from './editor-cell.model';
import { GridModel } from '../../../lib/core/models/grid.model';
import { MwEditorComponentModel } from '../../core/interfaces';
import { MwGridComponent } from '../../../lib/grid/grid.component';
import { Guid } from '../../core/utils';

export class EditorGridModel implements MwEditorComponentModel {
  constructor(
    public id: string = Guid.create(),
    public cells: EditorCellModel[] = [],
    public backgroundColor: string = '',
    public type: string = 'MwEditorGridComponent',
    public name: string = 'Grid',
    public icon: string = 'grid_on'
  ) {}

  toEditorModel(gridModel: GridModel) {
    this.id = gridModel.id;
    this.backgroundColor = gridModel.backgroundColor;
    if (gridModel.cells && gridModel.cells.length) {
      gridModel.cells.forEach(cell => {
        const editorCell = new EditorCellModel().toEditorModel(cell);
        this.cells.push(editorCell);
      });
    }
    return this;
  }

  toViewerModel(): GridModel {
    const gridModel = new GridModel(this.id, []);
    gridModel.type = MwGridComponent.name;
    this.cells.forEach(cell => {
      gridModel.cells.push(cell.toViewerModel());
    });
    gridModel.backgroundColor = this.backgroundColor;
    return gridModel;
  }
}
