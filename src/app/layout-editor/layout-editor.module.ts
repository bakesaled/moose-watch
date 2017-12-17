import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutEditorComponent } from './layout-editor.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LayoutEditorComponent, ToolPanelComponent],
  exports: [
    LayoutEditorComponent,
    ToolPanelComponent
  ]
})
export class LayoutEditorModule {}

