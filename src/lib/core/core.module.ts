import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  FlexLayoutShimService,
  LocalStorageService,
  MessageService,
  SaveService
} from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    MessageService,
    FlexLayoutShimService,
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
