import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import { MwModule } from '../../lib/public.module';

@NgModule({
  imports: [
    CommonModule,
    MwModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DndModule.forRoot()
  ],
  exports: [
    MwModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DndModule
  ],
  entryComponents: []
})
export class SharedModule {}
