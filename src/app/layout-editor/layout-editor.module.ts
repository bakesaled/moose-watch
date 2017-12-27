import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { MwEditorGridModule } from './grid/editor-grid.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { LayoutEditorComponent } from './layout-editor.component';
import { MwEditorGridComponent } from './grid';
import { MwEditorCellComponent } from './grid/cell';
import { MwEditorTextComponent } from './text';
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
  ],
  entryComponents: [
    MwEditorGridComponent,
    MwEditorCellComponent,
    MwEditorTextComponent
  ]
})
export class LayoutEditorModule {}
