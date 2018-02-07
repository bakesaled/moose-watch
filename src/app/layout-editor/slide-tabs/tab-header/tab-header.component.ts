import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mw-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabHeaderComponent implements OnInit {
  @HostBinding('class.mw-tab-header') hostClass = true;

  private selectedIdx: number;

  get selectedIndex(): number {
    return this.selectedIdx;
  }
  set selectedIndex(newValue: number) {
    this.selectedIdx = newValue;
  }

  constructor() {}

  ngOnInit() {}
}
