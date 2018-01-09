import { NgModule } from '@angular/core';
import { MwWorkAreaComponent } from './work-area.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MwEditorGridComponent } from '../grid';
import { MwEditorCellComponent } from '../grid/cell';
import { MwEditorTextComponent } from '../text';
import { MwEditorTextModule } from '../text/editor-text.module';
import { MwEditorGridModule } from '../grid/editor-grid.module';
import { MwLayoutModule } from '../../../lib/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MwEditorGridModule,
    MwEditorTextModule,
    MwLayoutModule
  ],
  declarations: [MwWorkAreaComponent],
  exports: [MwWorkAreaComponent],
  entryComponents: [
    MwEditorGridComponent,
    MwEditorCellComponent,
    MwEditorTextComponent
  ]
})
export class MwWorkAreaModule {}
