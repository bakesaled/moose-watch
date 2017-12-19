import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { MwGridModule } from '../../lib/grid/grid.module';
import { DndModule } from 'ng2-dnd';
import { MwGridComponent } from '../../lib/grid';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MwGridModule,
    DndModule.forRoot()
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MwGridModule,
    DndModule
  ],
  entryComponents: [
    MwGridComponent
  ]
})
export class SharedModule {}

