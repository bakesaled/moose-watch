import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MwTextComponent } from './text.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MwTextComponent],
  exports: [MwTextComponent]
})
export class MwTextModule {}
