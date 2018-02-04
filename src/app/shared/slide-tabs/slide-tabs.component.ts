import {
  Component,
  ContentChildren,
  HostBinding,
  OnInit,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';

@Component({
  selector: 'mw-slide-tabs',
  templateUrl: './slide-tabs.component.html',
  styleUrls: ['./slide-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideTabsComponent implements OnInit {
  @HostBinding('class.mw-slide-tabs') hostClass = true;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  private selectedIndex: number;

  constructor() {}

  ngOnInit() {}

  handleClick(tab: TabComponent, tabHeader: TabHeaderComponent, index: number) {
    this.selectedIndex = index;
    tabHeader.selectedIndex = index;
  }
}
