import { NgModule } from '@angular/core';
import { MwToolPanelComponent } from './tool-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PropertyEditorModule } from '../property-editor/property-editor.module';

@NgModule({
  imports: [CommonModule, SharedModule, PropertyEditorModule],
  declarations: [MwToolPanelComponent],
  exports: [MwToolPanelComponent]
})
export class MwToolPanelModule {}
