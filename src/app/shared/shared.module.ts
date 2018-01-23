import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { MwModule } from '../../lib/public.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MwModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    DndModule.forRoot()
  ],
  exports: [
    MwModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    DndModule
  ],
  entryComponents: []
})
export class SharedModule {}
