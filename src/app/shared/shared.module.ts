import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { MwModule } from '../../lib/public.module';
import { SelectionTagModule } from './selection-tag/selection-tag.module';

@NgModule({
  imports: [
    CommonModule,
    MwModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    SelectionTagModule,
    DndModule.forRoot()
  ],
  exports: [
    MwModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    SelectionTagModule,
    DndModule
  ],
  entryComponents: []
})
export class SharedModule {}
