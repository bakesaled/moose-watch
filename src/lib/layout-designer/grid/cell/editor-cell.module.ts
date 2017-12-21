import { NgModule } from '@angular/core';
import { MwEditorCellComponent } from './editor-cell.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MwEditorCellComponent
  ],
  exports: [
    MwEditorCellComponent
  ]
})
export class MwEditorCellModule {}
