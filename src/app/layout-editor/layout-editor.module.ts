import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutEditorComponent } from './layout-editor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LayoutEditorComponent],
  exports: [
    LayoutEditorComponent
  ]
})
export class LayoutEditorModule {}

