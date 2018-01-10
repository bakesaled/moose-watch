import { EditorCellModel } from './editor-cell.model';
import { GridModel } from '../../../lib/core/models/grid.model';
import { MwEditorComponentModel } from '../interfaces';

export class EditorGridModel implements MwEditorComponentModel {
  constructor(
    public id: string = 'NONE',
    public cells: EditorCellModel[] = [],
    public backgroundColor: string = '',
    public type: string = 'MwEditorGridComponent'
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
}
