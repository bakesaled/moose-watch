import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ErrorInterceptorProvider } from './error.interceptor';
import {
  LayoutListService,
  LayoutService,
  LocalStorageService,
  MessageService,
  SaveService
} from './services';

@NgModule({
  imports: [CommonModule],
  providers: [
    ErrorInterceptorProvider,
    LayoutListService,
    LayoutService,
    MessageService,
    SaveService,
    LocalStorageService
  ]
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
