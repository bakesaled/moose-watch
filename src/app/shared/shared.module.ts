import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwGridModule } from '../../lib/grid/grid.module';
import { MwGridComponent } from '../../lib/grid';
import { MwTextComponent } from '../../lib/text';
import { MwTextModule } from '../../lib/text/text.module';
import { DndModule } from 'ng2-dnd';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MwGridModule,
    MwTextModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DndModule.forRoot()
  ],
  exports: [
    MwGridModule,
    MwTextModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DndModule
  ],
  entryComponents: [MwGridComponent, MwTextComponent]
})
export class SharedModule {}
