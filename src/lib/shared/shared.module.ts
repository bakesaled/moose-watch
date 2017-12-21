import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    DndModule.forRoot()
  ],
  exports: [
    MatIconModule,
    DndModule
  ],
  entryComponents: [
  ]
})
export class SharedModule {}

