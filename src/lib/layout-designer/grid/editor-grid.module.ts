import { MwEditorGridComponent } from './editor-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutShimService } from '../../core';
import { MwEditorCellModule } from './cell/editor-cell.module';

@NgModule({
  imports: [
    CommonModule,
    MwEditorCellModule,
    FlexLayoutModule
  ],
  declarations: [
    MwEditorGridComponent
  ],
  exports: [
    MwEditorGridComponent,
    MwEditorCellModule,
    FlexLayoutModule
  ],
  providers: [
    FlexLayoutShimService
  ]
})
export class MwEditorGridModule {}
