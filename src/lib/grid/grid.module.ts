import { MwGridComponent } from './grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwCellModule } from './cell/cell.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutShimService } from '../core';

@NgModule({
  imports: [
    CommonModule,
    MwCellModule,
    FlexLayoutModule
  ],
  declarations: [
    MwGridComponent
  ],
  exports: [
    MwGridComponent,
    MwCellModule,
    FlexLayoutModule
  ],
  providers: [
    FlexLayoutShimService
  ]
})
export class MwGridModule {}
