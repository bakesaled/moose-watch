import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { MwGridModule } from '../../lib/grid/grid.module';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MwGridModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MwGridModule
  ]
})
export class SharedModule {}

