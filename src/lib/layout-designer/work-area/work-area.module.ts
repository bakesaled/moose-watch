import { NgModule } from '@angular/core';
import { MwWorkAreaComponent } from './work-area.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MwWorkAreaComponent
  ],
  exports: [
    MwWorkAreaComponent
  ]
})
export class MwWorkAreaModule {}
