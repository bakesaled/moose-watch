import { EditorGridModel } from './editor-grid.model';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { MwEditorComponentModel } from '../../core/interfaces';
import { MwLayoutComponent } from '../../../lib/layout/layout.component';
import { Guid } from '../../core/utils';
import { MwGridComponent } from '../../../lib/grid/grid.component';
import { GridModel } from '../../../lib/core/models/grid.model';

export class EditorLayoutModel implements MwEditorComponentModel {
  constructor(
    public id: string = Guid.create(),
    public name: string = 'NO_NAME',
    public isNew: boolean = true,
    public component: MwEditorComponentModel = null,
    public type: string = 'MwLayoutComponent',
    public icon: string = ''
  ) {}

  toEditorModel(layoutModel: LayoutModel): EditorLayoutModel {
    this.id = layoutModel.id;
    this.name = layoutModel.name;
    this.isNew = layoutModel.isNew;
    if (!layoutModel.isNew && layoutModel.component) {
      switch (layoutModel.component.type) {
        case 'MwGridComponent':
          this.component = new EditorGridModel().toEditorModel(
            <GridModel>layoutModel.component
          );
          break;
        default:
          throw new Error(
            `Component type '${layoutModel.component.type}' is not supported.`
          );
      }
    }
    return this;
  }

  toViewerModel(): LayoutModel {
    const layoutModel = new LayoutModel(this.id, this.name, this.isNew);
    layoutModel.component = this.component
      ? this.component.toViewerModel()
      : undefined;
    layoutModel.isNew = this.isNew;
    layoutModel.type = 'MwLayoutComponent';
    return layoutModel;
  }
}
