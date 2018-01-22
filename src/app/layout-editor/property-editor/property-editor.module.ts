import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyEditorComponent } from './property-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PropertyEditorComponent],
  exports: [PropertyEditorComponent]
})
export class PropertyEditorModule {}
