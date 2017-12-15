import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule
  ]
})
export class SharedModule {}

