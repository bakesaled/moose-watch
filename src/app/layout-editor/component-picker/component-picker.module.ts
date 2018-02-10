import { NgModule } from '@angular/core';
import { ComponentPickerComponent } from './component-picker.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ComponentPickerComponent],
  exports: [ComponentPickerComponent]
})
export class MwComponentPickerModule {}
