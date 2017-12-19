import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutEditorComponent } from './layout-editor.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';
import { WorkAreaComponent } from './work-area/work-area.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LayoutEditorComponent, ToolPanelComponent, WorkAreaComponent],
  exports: [
    LayoutEditorComponent,
    ToolPanelComponent,
    WorkAreaComponent
  ]
})
export class LayoutEditorModule {}

