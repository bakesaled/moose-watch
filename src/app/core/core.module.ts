import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LayoutListService } from './services/layout-list.service';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { LayoutService } from './services/layout.service';
import { ErrorInterceptorProvider } from './error.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [ErrorInterceptorProvider, LayoutListService, LayoutService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
