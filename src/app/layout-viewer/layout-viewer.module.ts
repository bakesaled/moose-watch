import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutViewerComponent } from './layout-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LayoutViewerComponent],
  exports: [
    LayoutViewerComponent
  ]
})
export class LayoutViewerModule {}

