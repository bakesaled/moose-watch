import { MwEditorGridComponent } from './editor-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwEditorCellModule } from './cell/editor-cell.module';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutShimService } from '../../../lib/core/services/flex-layout-shim.service';

@NgModule({
  imports: [CommonModule, MwEditorCellModule, SharedModule],
  declarations: [MwEditorGridComponent],
  exports: [MwEditorGridComponent, MwEditorCellModule],
  providers: [FlexLayoutShimService]
})
export class MwEditorGridModule {}
