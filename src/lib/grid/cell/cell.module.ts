import { NgModule } from '@angular/core';
import { MwCellComponent } from './cell.component';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    DndModule.forRoot()
  ],
  declarations: [
    MwCellComponent
  ],
  exports: [
    MwCellComponent,
    DndModule
  ]
})
export class MwCellModule {}
