import { NgModule } from '@angular/core';
import { FactoryComponent } from './factory.component';
import { CommonModule } from '@angular/common';
import { ComponentFactoryService } from './component-factory.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FactoryComponent],
  exports: [FactoryComponent],
  providers: [ComponentFactoryService],
  entryComponents: []
})
export class FactoryModule {}
