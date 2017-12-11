import { NgModule } from '@angular/core';
import { LayoutListService } from './services/layout-list.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LayoutListService
  ]
})
export class CoreModule {}
