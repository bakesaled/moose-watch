import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { MwGridModule } from '../../lib/grid/grid.module';
import { DndModule } from 'ng2-dnd';
import { MwGridComponent } from '../../lib/grid';
import { MwTextComponent } from '../../lib/text';
import { MwTextModule } from '../../lib/text/text.module';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MwGridModule,
    MwTextModule,
    DndModule.forRoot()
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MwGridModule,
    MwTextModule,
    DndModule
  ],
  entryComponents: [
    MwGridComponent,
    MwTextComponent
  ]
})
export class SharedModule {}

