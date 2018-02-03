import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { MwModule } from '../../lib/public.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideTabsModule } from './slide-tabs/slide-tabs.module';

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
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SlideTabsModule,
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
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SlideTabsModule,
    DndModule
  ],
  entryComponents: []
})
export class SharedModule {}
