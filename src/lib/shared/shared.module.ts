import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MwFactoryModule } from '../factory/factory.module';
import { MwGridComponent } from '../grid';
import { MwCellComponent } from '../grid/cell';
import { MwNoComponent } from '../no-component/no.component';
import { MwTextComponent } from '../text';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MwFactoryModule],
  declarations: [MwNoComponent],
  exports: [FlexLayoutModule, MwFactoryModule],
  entryComponents: [
    MwGridComponent,
    MwCellComponent,
    MwTextComponent,
    MwNoComponent
  ]
})
export class SharedModule {}
