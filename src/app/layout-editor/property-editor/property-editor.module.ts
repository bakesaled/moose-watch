import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyEditorComponent } from './property-editor.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [PropertyEditorComponent],
  exports: [PropertyEditorComponent]
})
export class PropertyEditorModule {}
