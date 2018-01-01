import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import { MwLayoutModule } from '../../lib/layout';
import { MwTextComponent, MwTextModule } from '../../lib/text';

@NgModule({
  imports: [
    CommonModule,
    MwTextModule,
    MwLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DndModule.forRoot()
  ],
  exports: [
    MwTextModule,
    MwLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DndModule
  ],
  entryComponents: [MwTextComponent]
})
export class SharedModule {}
