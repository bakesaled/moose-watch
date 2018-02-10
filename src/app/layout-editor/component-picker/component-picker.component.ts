import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MwEditorComponentModel } from '../../core/interfaces';
import { EditorGridModel, EditorTextModel } from '../models';

@Component({
  selector: 'mw-component-picker',
  templateUrl: './component-picker.component.html',
  styleUrls: ['./component-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentPickerComponent implements OnInit {
  @HostBinding('class.mw-component-picker') hostClass = true;

  tools: Array<MwEditorComponentModel> = [
    new EditorGridModel(),
    new EditorTextModel()
  ];

  constructor() {}

  ngOnInit() {}
}
