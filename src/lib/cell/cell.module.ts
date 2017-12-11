import { NgModule } from '@angular/core';
import { MwCellComponent } from './cell.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MwCellComponent
  ],
  exports: [
    MwCellComponent
  ]
})
export class MwCellModule {}
