import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { DropEvent, MwEditorComponent } from '../../../core/interfaces';
import { FlexLayoutShimService } from '../../../../lib/core/services/flex-layout-shim.service';
import { EditorCellModel, EditorTextModel } from '../../../core/models';
import { MwEditorTextComponent } from '../../text';
import { Command } from '../../../core/enums';
import { WorkAreaMessage } from '../../../core/messages/work-area.message';
import { MessageService } from '../../../core/services';
import { EditorCellMessage } from '../../../core/messages/editor-cell.message';

@Component({
  selector: 'mw-editor-cell',
  templateUrl: './editor-cell.component.html',
  styleUrls: ['./editor-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorCellComponent
  implements OnInit, MwEditorComponent, OnChanges {
  @HostBinding('class.mw-editor-cell') editorCellClass = true;
  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;

  private cellModel: EditorCellModel;

  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Output() dropSuccessEmitter = new EventEmitter<DropEvent>();

  @Input()
  get model(): EditorCellModel {
    return this.cellModel;
  }
  set model(newValue: EditorCellModel) {
    this.cellModel = newValue;
    this.model.width = 50;
    this.fxFlex = this.model.width;
    this.style = this.flexShim.getStyle('fxFlex', this.model.width);
    this.backgroundColor = this.model.backgroundColor;
    console.log('cellModel', newValue);
    this.changeDetector.markForCheck();
  }

  constructor(
    private flexShim: FlexLayoutShimService,
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorCellModel();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  handleDrop(event: DropEvent) {
    console.log('cell drop', event);
    switch (event.dragData) {
      case 'text':
        this.model.component = new EditorTextModel();
        break;
    }
    this.messageService.publish(EditorCellMessage, {
      command: Command.drop,
      data: event
    });
    // this.dropSuccessEmitter.emit(event);
  }
}
