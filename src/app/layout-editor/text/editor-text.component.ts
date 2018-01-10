import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorComponent } from '../../core/interfaces';
import { EditorTextModel } from '../../core/models';

@Component({
  selector: 'mw-text',
  templateUrl: './editor-text.component.html',
  styleUrls: ['./editor-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwEditorTextComponent implements OnInit, MwEditorComponent {
  @HostBinding('class.mw-editor-text') editorTextClass = true;

  private textModel: EditorTextModel;

  @Input()
  get model(): EditorTextModel {
    return this.textModel;
  }
  set model(newValue: EditorTextModel) {
    this.textModel = newValue;
    this.model.value = '[text]';
    console.log('newValue', newValue);
    this.changeDetector.markForCheck();
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorTextModel();
    }
  }
}
