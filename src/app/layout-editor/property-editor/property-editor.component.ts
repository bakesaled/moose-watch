import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EditorTextModel } from '../models';
import { MatButtonToggleChange } from '@angular/material';
import { PropertyEditorMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { MessageService } from '../../core/services';

interface InputEvent {
  target: {
    value: string;
  };
}

@Component({
  selector: 'mw-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyEditorComponent implements OnInit, OnDestroy, OnChanges {
  @HostBinding('class.mw-property-editor') propertyEditorClass = true;

  private subscriptions: Subscription[] = [];
  private model: EditorTextModel;

  @Input()
  get componentModel(): EditorTextModel {
    return this.model;
  }
  set componentModel(newValue: EditorTextModel) {
    this.model = newValue;
    this.changeDetector.markForCheck();
    console.log('property editor model set', newValue);
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  onFontStyleChange(event: MatButtonToggleChange) {
    this.componentModel.fontStyle = event.source.checked ? 'italic' : 'normal';
    this.notify();
    this.changeDetector.markForCheck();
  }

  onFontWeightChange(event: MatButtonToggleChange) {
    this.componentModel.fontWeight = event.source.checked ? '900' : '400';
    this.notify();
    this.changeDetector.markForCheck();
  }

  onFontSizeInput(event: InputEvent) {
    this.componentModel.fontSize = event.target.value + 'px';
    this.notify();
  }

  onColorInput(event: InputEvent) {
    this.componentModel.color = event.target.value;
    this.notify();
  }

  private notify() {
    this.messageService.publish(PropertyEditorMessage, {
      command: Command.propertyChange,
      data: this.componentModel
    });
  }
}
