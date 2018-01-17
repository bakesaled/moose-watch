import { MwNoComponent } from '../../../lib/no-component/no.component';
import { EditorGridModel } from './editor-grid.model';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { MwEditorComponentModel } from '../interfaces';
import { MwLayoutComponent } from '../../../lib/layout/layout.component';
import { Guid } from '../utils';

export class EditorLayoutModel implements MwEditorComponentModel {
  constructor(
    public id: string = Guid.create(),
    public name: string = 'NO_NAME',
    public isNew: boolean = true,
    public grid: EditorGridModel = null,
    public type: string = 'MwNoComponent',
    public icon: string = ''
  ) {}

  toEditorModel(layoutModel: LayoutModel): EditorLayoutModel {
    this.id = layoutModel.id;
    this.name = layoutModel.name;
    this.isNew = layoutModel.isNew;
    if (!layoutModel.isNew && layoutModel.grid) {
      this.grid = new EditorGridModel().toEditorModel(layoutModel.grid);
    }
    return this;
  }

  toViewerModel(): LayoutModel {
    const layoutModel = new LayoutModel(this.id, this.name, this.isNew);
    if (this.grid) {
      layoutModel.grid = this.grid.toViewerModel();
    }
    layoutModel.isNew = this.isNew;
    layoutModel.type = MwLayoutComponent.name;
    return layoutModel;
  }
}
