import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwEditorTextComponent } from './editor-text.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectionTagModule } from '../selection-tag/selection-tag.module';

@NgModule({
  imports: [CommonModule, SharedModule, SelectionTagModule],
  declarations: [MwEditorTextComponent],
  exports: [MwEditorTextComponent, SelectionTagModule]
})
export class MwEditorTextModule {}
