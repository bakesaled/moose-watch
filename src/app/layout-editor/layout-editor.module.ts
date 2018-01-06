import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MwEditorGridModule } from './grid/editor-grid.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { LayoutEditorComponent } from './layout-editor.component';
import { MwEditorTextModule } from './text/editor-text.module';

@NgModule({
  declarations: [LayoutEditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    MwEditorGridModule,
    MwEditorTextModule,
    MwToolPanelModule,
    MwWorkAreaModule
  ],
  exports: [
    LayoutEditorComponent,
    MwEditorGridModule,
    MwEditorTextModule,
    MwToolPanelModule,
    MwWorkAreaModule
  ]
})
export class LayoutEditorModule {}
