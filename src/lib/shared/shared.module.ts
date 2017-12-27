import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FactoryModule } from '../factory/factory.module';
import { MwGridComponent } from '../grid';
import { MwCellComponent } from '../grid/cell';
import { NoComponent } from '../no.component';
import { MwTextComponent } from '../text';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, FactoryModule],
  declarations: [NoComponent],
  exports: [FlexLayoutModule, FactoryModule],
  entryComponents: [
    MwGridComponent,
    MwCellComponent,
    MwTextComponent,
    NoComponent
  ]
})
export class SharedModule {}
