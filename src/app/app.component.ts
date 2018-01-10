import { Component, OnInit } from '@angular/core';
import { MwEditorGridComponent } from './layout-editor/grid';
import { MwComponentRegistry } from '../lib/factory/component-registry';
import { MwEditorTextComponent } from './layout-editor/text';

@Component({
  selector: 'mw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Build custom component registry for editor components
    MwComponentRegistry.custom = {
      MwEditorGridComponent: MwEditorGridComponent,
      MwEditorTextComponent: MwEditorTextComponent
    };
  }
}
