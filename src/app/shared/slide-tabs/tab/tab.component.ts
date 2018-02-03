import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mw-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  @Input() label: string;
  constructor() {}

  ngOnInit() {}
}
