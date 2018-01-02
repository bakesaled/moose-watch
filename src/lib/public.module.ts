import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MwLayoutModule } from './layout/layout.module';
import { LayoutService } from './layout/layout.service';
import { ComponentFactoryService } from './factory/component-factory.service';
import { FlexLayoutShimService } from './core/services/flex-layout-shim.service';
import { MwTextModule } from './text/text.module';

export let providers = [
  LayoutService,
  ComponentFactoryService,
  FlexLayoutShimService
];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MwTextModule, MwLayoutModule],
  exports: [FlexLayoutModule, MwTextModule, MwLayoutModule]
  // providers: [LayoutService, ComponentFactoryService, FlexLayoutShimService],
  // entryComponents: [MwGridComponent, MwCellComponent, MwNoComponent]
})
export class MwModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MwModule,
      providers: providers
    };
  }
}
