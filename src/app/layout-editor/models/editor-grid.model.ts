import { EditorCellModel } from './editor-cell.model';
import { GridModel } from '../../../lib/core/models/grid.model';
import { MwEditorComponentModel } from '../../core/interfaces';
import { MwGridComponent } from '../../../lib/grid/grid.component';
import { Guid } from '../../core/utils';
import { isNullOrUndefined } from 'util';

export class EditorGridModel implements MwEditorComponentModel {
  public static readonly maxCellCount = 8;

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
    gridModel.type = 'MwGridComponent';
    this.cells.forEach(cell => {
      gridModel.cells.push(cell.toViewerModel());
    });
    gridModel.backgroundColor = this.backgroundColor;
    return gridModel;
  }

  addCell() {
    if (this.cells.length < EditorGridModel.maxCellCount) {
      this.cells.push(new EditorCellModel());
    }
  }

  removeCell(): boolean {
    if (this.cells.length > 1) {
      for (let i = this.cells.length - 1; i > 0; i--) {
        if (!this.cells[i].component) {
          this.cells.pop();
          return true;
        }
      }
    }
    return false;
  }

  changeCellCount(newCount: number): boolean {
    if (newCount === 0 || newCount > EditorGridModel.maxCellCount) {
      return false;
    }

    if (this.cells.length < newCount) {
      while (this.cells.length < newCount) {
        this.addCell();
      }
    } else if (this.cells.length > newCount) {
      const startingCellCount = this.cells.length;
      let iterationCount = 0;
      let cellRemoved = false;
      while (
        this.cells.length > newCount &&
        iterationCount < startingCellCount
      ) {
        if (this.removeCell()) {
          cellRemoved = true;
          iterationCount++;
        }
      }
      return cellRemoved;
    }

    return true;
  }

  cellsAreFull() {
    return this.cells.every(cell => {
      return !isNullOrUndefined(cell.component);
    });
  }
}
