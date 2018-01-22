import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorComponent } from '../../core/interfaces';
import { EditorTextModel } from '../models';
import { MessageService } from '../../core/services';
import { EditorComponentMessage } from '../../core/messages';
import { Command } from '../../core/enums';

@Component({
  selector: 'mw-text',
  templateUrl: './editor-text.component.html',
  styleUrls: ['./editor-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorTextComponent implements OnInit, MwEditorComponent {
  @HostBinding('class.mw-editor-text') editorTextClass = true;

  private textModel: EditorTextModel;
  private isSelected = false;

  get selected(): boolean {
    return this.isSelected;
  }
  set selected(newValue: boolean) {
    this.isSelected = newValue;
    this.messageService.publish(EditorComponentMessage, {
      command: Command.select,
      data: this.model
    });
    this.changeDetector.markForCheck();
  }

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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorTextModel();
    }
  }

  onclick() {
    this.selected = !this.selected;
    this.changeDetector.markForCheck();
  }
}
