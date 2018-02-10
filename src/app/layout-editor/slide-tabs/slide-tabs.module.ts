import { NgModule } from '@angular/core';
import { SlideTabsComponent } from './slide-tabs.component';
import { TabComponent } from './tab/tab.component';
import { CommonModule } from '@angular/common';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabBodyHostDirective } from './tab-body/tab-body-host.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SlideTabsComponent,
    TabComponent,
    TabHeaderComponent,
    TabBodyComponent,
    TabBodyHostDirective
  ],
  exports: [SlideTabsComponent, TabComponent]
})
export class SlideTabsModule {}
