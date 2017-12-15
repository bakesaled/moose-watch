import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule {}
