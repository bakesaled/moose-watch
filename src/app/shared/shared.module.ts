import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwGridModule } from '../../lib/grid/grid.module';
import { MwGridComponent } from '../../lib/grid';
import { MwTextComponent } from '../../lib/text';
import { MwTextModule } from '../../lib/text/text.module';
import { MwLayoutEditorModule } from '../../lib/layout-designer/layout-editor.module';

@NgModule({
  imports: [
    CommonModule,
    MwGridModule,
    MwTextModule,
    MwLayoutEditorModule
  ],
  exports: [
    MwGridModule,
    MwTextModule,
    MwLayoutEditorModule
  ],
  entryComponents: [
    MwGridComponent,
    MwTextComponent
  ]
})
export class SharedModule {}

