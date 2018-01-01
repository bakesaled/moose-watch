import { NgModule } from '@angular/core';
import { MwLayoutComponent } from './layout.component';
import { LayoutService } from './layout.service';
import { CommonModule } from '@angular/common';
import { MwGridComponent } from '../grid';
import { MwCellComponent } from '../grid/cell';
import { ComponentFactoryService, MwFactoryComponent } from '../factory';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MwNoComponent } from '../no-component';
import { FlexLayoutShimService } from '../core/services';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [
    MwLayoutComponent,
    MwGridComponent,
    MwCellComponent,
    MwFactoryComponent,
    MwNoComponent
  ],
  exports: [MwLayoutComponent, FlexLayoutModule],
  providers: [LayoutService, ComponentFactoryService, FlexLayoutShimService],
  entryComponents: [MwGridComponent, MwCellComponent, MwNoComponent]
})
export class MwLayoutModule {}
