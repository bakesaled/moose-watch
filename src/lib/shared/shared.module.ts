import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FactoryModule } from '../factory/factory.module';
import { MwGridComponent } from '../grid';
import { MwCellComponent } from '../grid/cell';
import { NoComponent } from '../no.component';
import { MwTextComponent } from '../text';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    DndModule.forRoot(),
    FactoryModule
  ],
  declarations: [NoComponent],
  exports: [MatIconModule, FlexLayoutModule, DndModule, FactoryModule],
  entryComponents: [
    MwGridComponent,
    MwCellComponent,
    MwTextComponent,
    NoComponent
  ]
})
export class SharedModule {}
