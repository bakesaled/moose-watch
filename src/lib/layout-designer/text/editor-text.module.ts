import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwEditorTextComponent } from './editor-text.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MwEditorTextComponent
  ],
  exports: [
    MwEditorTextComponent
  ]
})
export class MwEditorTextModule {}
