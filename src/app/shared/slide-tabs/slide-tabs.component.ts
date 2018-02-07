import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
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

  private selectedIdx: number;

  get selectedIndex(): number {
    return this.selectedIdx;
  }
  set selectedIndex(newValue: number) {
    this.selectedIdx = newValue;
  }

  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  @Output()
  readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  constructor() {}

  ngOnInit() {}

  handleClick(tab: TabComponent, tabHeader: TabHeaderComponent, index: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = undefined;
    } else {
      this.selectedIndex = index;
      tabHeader.selectedIndex = index;
    }
    this.selectedIndexChange.emit(this.selectedIndex);
  }
}
