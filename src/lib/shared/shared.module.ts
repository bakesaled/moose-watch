import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    DndModule.forRoot()
  ],
  exports: [
    MatIconModule,
    FlexLayoutModule,
    DndModule
  ],
  entryComponents: [
  ]
})
export class SharedModule {}

