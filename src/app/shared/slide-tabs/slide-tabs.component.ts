import { Component, ContentChildren, HostBinding, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'mw-slide-tabs',
  templateUrl: './slide-tabs.component.html',
  styleUrls: ['./slide-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideTabsComponent implements OnInit {
  @HostBinding('class.mw-slide-tabs') hostClass = true;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  constructor() {}

  ngOnInit() {}
}
