import { NgModule } from '@angular/core';
import { MwCellComponent } from './cell.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MwCellComponent
  ],
  exports: [
    MwCellComponent,
    SharedModule
  ]
})
export class MwCellModule {}
