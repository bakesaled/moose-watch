import { EditorCellModel } from './editor-cell.model';
import { Type } from '@angular/core';
import { MwComponentModel } from '../../../lib/core/interfaces/mw-component.model';
import { MwNoComponent } from '../../../lib/no-component/no.component';
import { GridModel } from '../../../lib/core/models/grid.model';
import { MwEditorComponentModel } from '../interfaces/mw-editor-component.model';

export class EditorGridModel implements MwEditorComponentModel {
  constructor(
    public id: string = 'NONE',
    public cells: EditorCellModel[] = [],
    public backgroundColor: string = '',
    public type: string = 'MwEditorGridComponent'
  ) {}

  toEditorModel(gridModel: GridModel) {
    this.id = gridModel.id;
    if (gridModel.cells && gridModel.cells.length) {
      gridModel.cells.forEach(cell => {
        const editorCell = new EditorCellModel().toEditorModel(cell);
        this.cells.push(editorCell);
      });
    }
    return this;
  }
}
