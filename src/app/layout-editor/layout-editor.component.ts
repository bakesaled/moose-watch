import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mw-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutEditorComponent implements OnInit {
  @HostBinding('class.mw-layout-editor') layoutEditorClass = true;
  constructor() { }

  ngOnInit() {
  }


}
