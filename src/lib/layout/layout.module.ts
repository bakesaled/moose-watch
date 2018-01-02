import { NgModule } from '@angular/core';
import { MwLayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutService } from './layout.service';
import { MwGridComponent } from '../grid/grid.component';
import { MwCellComponent } from '../grid/cell/cell.component';
import { MwFactoryComponent } from '../factory/factory.component';
import { MwNoComponent } from '../no-component/no.component';
import { ComponentFactoryService } from '../factory/component-factory.service';
import { FlexLayoutShimService } from '../core/services/flex-layout-shim.service';
import { HttpClientModule } from '@angular/common/http';
import { MwTextComponent } from '../text/text.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, HttpClientModule],
  declarations: [
    MwLayoutComponent,
    MwGridComponent,
    MwCellComponent,
    MwFactoryComponent,
    MwNoComponent
  ],
  exports: [MwLayoutComponent, FlexLayoutModule],
  providers: [LayoutService, ComponentFactoryService, FlexLayoutShimService],
  entryComponents: [
    MwGridComponent,
    MwCellComponent,
    MwNoComponent,
    MwTextComponent
  ]
})
export class MwLayoutModule {}
