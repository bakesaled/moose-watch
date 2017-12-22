import { Component, OnInit } from '@angular/core';
import { DropEvent } from '../../core/interfaces';

@Component({
  selector: 'mw-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss']
})
export class MwToolPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleDropSuccess(event: DropEvent) {
    console.log('deleted', event);
  }
}
