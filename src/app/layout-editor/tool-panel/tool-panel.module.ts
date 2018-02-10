import { NgModule } from '@angular/core';
import { MwToolPanelComponent } from './tool-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MwPropertyEditorModule } from '../property-editor/property-editor.module';
import { MwComponentPickerModule } from '../component-picker/component-picker.module';
import { SlideTabsModule } from '../slide-tabs/slide-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MwPropertyEditorModule,
    MwComponentPickerModule,
    SlideTabsModule
  ],
  declarations: [MwToolPanelComponent],
  exports: [MwToolPanelComponent]
})
export class MwToolPanelModule {}
