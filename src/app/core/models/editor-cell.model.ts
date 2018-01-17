import { CellModel } from '../../../lib/core/models/cell.model';
import { MwEditorComponentModel } from '../interfaces';
import { MwTextComponent } from '../../../lib/text/text.component';
import { EditorTextModel } from './editor-text.model';
import { TextModel } from '../../../lib/core/models/text.model';
import { MwCellComponent } from '../../../lib/grid/cell/cell.component';
import { Guid } from '../utils';

export class EditorCellModel implements MwEditorComponentModel {
  constructor(
    public id: string = Guid.create(),
    public width: number = 0,
    public backgroundColor?: string,
    public margin: number = 0,
    public type: string = 'MwEditorCellComponent',
    public component: MwEditorComponentModel = null
  ) {}

  toEditorModel(cellModel: CellModel): EditorCellModel {
    this.id = cellModel.id;
    this.backgroundColor = cellModel.backgroundColor;
    this.width = cellModel.width;
    if (cellModel.component) {
      switch (cellModel.component.type) {
        case 'MwTextComponent':
          this.component = new EditorTextModel().toEditorModel(
            <TextModel>cellModel.component
          );
          break;
      }
    }
    return this;
  }

  toViewerModel(): CellModel {
    const cellModel = new CellModel(this.id);
    cellModel.type = MwCellComponent.name;
    if (this.component) {
      cellModel.component = this.component.toViewerModel();
    }
    cellModel.backgroundColor = this.backgroundColor;
    cellModel.width = this.width;
    return cellModel;
  }
}
