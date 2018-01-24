import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EditorTextModel } from '../models';
import { MatButtonToggleChange } from '@angular/material';
import { PropertyEditorMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { MessageService } from '../../core/services';

@Component({
  selector: 'mw-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyEditorComponent implements OnInit, OnDestroy {
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
    console.log('property changed', newValue);
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  private notify() {
    this.messageService.publish(PropertyEditorMessage, {
      command: Command.propertyChange,
      data: this.componentModel
    });
  }
}
