import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { MwEditorGridModule } from './grid/editor-grid.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { MwLayoutEditorComponent } from './layout-editor.component';
import { MwEditorGridComponent } from './grid';
import { MwEditorCellComponent } from './grid/cell';
import { CoreModule } from '../core/core.module';
import { MwEditorTextComponent } from './text';
import { MwEditorTextModule } from './text/editor-text.module';

@NgModule({
  declarations: [
    MwLayoutEditorComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MwEditorGridModule,
    MwEditorTextModule,
    MwToolPanelModule,
    MwWorkAreaModule
  ],
  exports: [
    MwLayoutEditorComponent,
    MatSidenavModule,
    MatListModule,
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
export class MwLayoutEditorModule { }
