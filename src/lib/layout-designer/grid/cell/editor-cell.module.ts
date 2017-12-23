import { NgModule } from '@angular/core';
import { MwEditorCellComponent } from './editor-cell.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MwEditorCellComponent
  ],
  exports: [
    MwEditorCellComponent
  ]
})
export class MwEditorCellModule {}
