import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionTagComponent } from './selection-tag.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [SelectionTagComponent],
  exports: [SelectionTagComponent, MatIconModule]
})
export class SelectionTagModule {}
