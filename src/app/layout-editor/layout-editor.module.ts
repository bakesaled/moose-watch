import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MwEditorGridModule } from './grid/editor-grid.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { LayoutEditorComponent } from './layout-editor.component';
import { MwEditorTextModule } from './text/editor-text.module';
import { LayoutEditorRoutingModule } from './layout-editor-routing.module';
import { MwEditorTextComponent } from './text';
import { MwComponentRegistry } from '../../lib/factory/component-registry';
import { MwEditorGridComponent } from './grid';

@NgModule({
  declarations: [LayoutEditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    MwEditorGridModule,
    MwEditorTextModule,
    MwToolPanelModule,
    MwWorkAreaModule,
    LayoutEditorRoutingModule
  ],
  exports: [
    LayoutEditorComponent,
    MwEditorGridModule,
    MwEditorTextModule,
    MwToolPanelModule,
    MwWorkAreaModule,
  ]
})
export class LayoutEditorModule {
  constructor() {
    // Build custom component registry for editor components
    MwComponentRegistry.custom = {
      MwEditorGridComponent: MwEditorGridComponent,
      MwEditorTextComponent: MwEditorTextComponent
    };
  }
}
