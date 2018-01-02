import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorComponent } from '../../core/interfaces';
import { TextModel } from '../../../lib/core/models/text.model';

@Component({
  selector: 'mw-text',
  templateUrl: './editor-text.component.html',
  styleUrls: ['./editor-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwEditorTextComponent implements OnInit, MwEditorComponent {
  @HostBinding('class.mw-editor-text') editorTextClass = true;

  model: TextModel;

  constructor() {}

  ngOnInit() {
    this.model = new TextModel();
    this.model.value = '[text]';
  }
}
