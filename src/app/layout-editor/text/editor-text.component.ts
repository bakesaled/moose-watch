import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorComponent } from '../../core/interfaces';
import { EditorTextModel } from '../models';
import { MessageService } from '../../core/services';
import {
  EditorComponentMessage,
  PropertyEditorMessage
} from '../../core/messages';
import { Command } from '../../core/enums';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mw-editor-text',
  templateUrl: './editor-text.component.html',
  styleUrls: ['./editor-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorTextComponent
  implements OnInit, MwEditorComponent, OnDestroy {
  @HostBinding('class.mw-editor-text') editorTextClass = true;

  private subscriptions: Subscription[] = [];
  private textModel: EditorTextModel;
  private isSelected = false;

  get selected(): boolean {
    return this.isSelected;
  }
  set selected(newValue: boolean) {
    this.isSelected = newValue;
    this.changeDetector.markForCheck();
  }

  @Input()
  get model(): EditorTextModel {
    return this.textModel;
  }
  set model(newValue: EditorTextModel) {
    this.textModel = newValue;
    this.model.value = this.model.value ? this.model.value : '[text]';
    if (this.textModel) {
      this.model.fontStyle = this.textModel.fontStyle;
      this.model.fontWeight = this.textModel.fontWeight;
      this.model.fontSize = this.textModel.fontSize;
      this.model.color = this.textModel.color;
    }
    this.changeDetector.markForCheck();
  }

  editMode = false;

  @ViewChild('input') inputRef: ElementRef;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorTextModel();
    }

    this.subscriptions.push(
      this.messageService
        .channel(PropertyEditorMessage)
        .subscribe(msg => this.handlePropertyEditorMessage(msg))
    );

    this.subscriptions.push(
      this.messageService
        .channel(EditorComponentMessage)
        .subscribe(msg => this.handleEditorComponentMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onclick() {
    this.selected = !this.selected;
    this.messageService.publish(EditorComponentMessage, {
      command: Command.select,
      data: this.isSelected ? this.model : undefined
    });
  }

  ondblclick() {
    if (!this.editMode) {
      this.editMode = true;
      this.changeDetector.markForCheck();
      setTimeout(() => {
        const inputEl: HTMLInputElement = this.inputRef.nativeElement;
        inputEl.setSelectionRange(0, inputEl.value.length);
        inputEl.focus();
      });
    }
  }

  handleInput() {
    this.notify();
  }

  private handlePropertyEditorMessage(msg: PropertyEditorMessage) {
    if (msg.command === Command.propertyChange) {
      this.model = msg.data;
      this.notify();
    }
  }

  private notify() {
    this.messageService.publish(EditorComponentMessage, {
      command: Command.propertyChange
    });
  }

  private handleEditorComponentMessage(msg: EditorComponentMessage) {
    if (msg.command === Command.select) {
      if (this.selected && msg.data !== this.model) {
        this.selected = false;
      }
    }
  }
}
