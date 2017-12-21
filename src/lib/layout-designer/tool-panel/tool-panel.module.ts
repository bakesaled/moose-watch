import { NgModule } from '@angular/core';
import { MwToolPanelComponent } from './tool-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MwToolPanelComponent
  ],
  exports: [
    MwToolPanelComponent
  ]
})
export class MwToolPanelModule {}
