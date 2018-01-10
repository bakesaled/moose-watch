import { CellModel } from '../../../lib/core/models/cell.model';
import { MwEditorComponentModel } from '../interfaces/mw-editor-component.model';
import { MwTextComponent } from '../../../lib/text/text.component';
import { EditorTextModel } from './editor-text.model';
import { TextModel } from '../../../lib/core/models/text.model';

export class EditorCellModel implements MwEditorComponentModel {
  constructor(
    public id: string = 'NONE',
    public width: number = 0,
    public backgroundColor?: string,
    public margin: number = 0,
    public type: string = 'MwEditorCellComponent',
    public component: MwEditorComponentModel = null
  ) {}

  toEditorModel(cellModel: CellModel): EditorCellModel {
    this.id = cellModel.id;
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
}
