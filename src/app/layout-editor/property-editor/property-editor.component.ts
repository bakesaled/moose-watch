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
import { EditorGridModel, EditorTextModel } from '../models';
import { MatButtonToggleChange } from '@angular/material';
import { PropertyEditorMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { MessageService } from '../../core/services';
import { FormControl, Validators } from '@angular/forms';
import { DirtyErrorStateMatcher } from '../../core/forms/dirty-error-state-matcher';

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
export class PropertyEditorComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-property-editor') propertyEditorClass = true;

  private subscriptions: Subscription[] = [];
  private model: any;

  @Input()
  get componentModel(): any {
    return this.model;
  }
  set componentModel(newValue: any) {
    this.model = newValue;

    if (this.componentModel instanceof EditorGridModel) {
      this.cellCount = new FormControl(this.model.cells.length, [
        Validators.min(1),
        Validators.max(EditorGridModel.maxCellCount),
        this.cellsAreFullValidator
      ]);
    }

    this.changeDetector.markForCheck();
    console.log('property editor model set', newValue);
  }

  matcher: DirtyErrorStateMatcher = new DirtyErrorStateMatcher();
  cellCount: FormControl;

  cellsAreFullValidator = (formControl: FormControl) => {
    const newCount = parseInt(formControl.value, 10);
    return newCount > 0 &&
      newCount < this.model.cells.length &&
      this.model.cellsAreFull()
      ? { cellsAreFull: { valid: false } }
      : null;
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onFontStyleChange(event: MatButtonToggleChange) {
    if (this.componentModel instanceof EditorTextModel) {
      this.componentModel.fontStyle = event.source.checked
        ? 'italic'
        : 'normal';
      this.notify();
      this.changeDetector.markForCheck();
    }
  }

  onFontWeightChange(event: MatButtonToggleChange) {
    if (this.componentModel instanceof EditorTextModel) {
      this.componentModel.fontWeight = event.source.checked ? '900' : '400';
      this.notify();
      this.changeDetector.markForCheck();
    }
  }

  onFontSizeInput(event: InputEvent) {
    if (this.componentModel instanceof EditorTextModel) {
      this.componentModel.fontSize = event.target.value + 'px';
      this.notify();
    }
  }

  onColorInput(event: InputEvent) {
    if (this.componentModel instanceof EditorTextModel) {
      this.componentModel.color = event.target.value;
      this.notify();
    }
  }

  onCellCountInput(event: InputEvent) {
    console.log('input');
    if (this.componentModel instanceof EditorGridModel) {
      if (this.cellCount.invalid) {
        console.log('cannot remove any more cells');
        return;
      }

      console.log('cellcount change', event.target.value);
      const newValue = parseInt(event.target.value, 10);
      const changeSucceeded = this.componentModel.changeCellCount(newValue);
      if (!changeSucceeded) {
        console.error('failure');
        return;
      }
      this.notify();
    }
  }

  private notify() {
    this.messageService.publish(PropertyEditorMessage, {
      command: Command.propertyChange,
      data: this.componentModel
    });
  }
}
