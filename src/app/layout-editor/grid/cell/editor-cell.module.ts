import { NgModule } from '@angular/core';
import { MwEditorCellComponent } from './editor-cell.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { SelectionTagModule } from '../../selection-tag/selection-tag.module';

@NgModule({
  imports: [CommonModule, SharedModule, SelectionTagModule],
  declarations: [MwEditorCellComponent],
  exports: [MwEditorCellComponent]
})
export class MwEditorCellModule {}
