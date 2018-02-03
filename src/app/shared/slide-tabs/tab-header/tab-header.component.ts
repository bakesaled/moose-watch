import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mw-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabHeaderComponent implements OnInit {
  @HostBinding('class.mw-tab-header') hostClass = true;
  constructor() { }

  ngOnInit() {
  }

}
