import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DropEvent, MwEditorComponent } from '../../../core/interfaces';
import { FlexLayoutShimService } from '../../../../lib/core/services/flex-layout-shim.service';
import { EditorCellModel, EditorTextModel } from '../../models';
import { Command } from '../../../core/enums';
import { MessageService } from '../../../core/services';
import { EditorCellMessage } from '../../../core/messages/editor-cell.message';
import { ToolPanelMessage } from '../../../core';
import { Subscription } from 'rxjs/Subscription';
import { MwFactoryComponent } from '../../../../lib/factory/factory.component';
import { MwEditorTextComponent } from '../../text';

@Component({
  selector: 'mw-editor-cell',
  templateUrl: './editor-cell.component.html',
  styleUrls: ['./editor-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorCellComponent
  implements OnInit, MwEditorComponent, OnChanges, OnDestroy {
  @HostBinding('class.mw-editor-cell') editorCellClass = true;
  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;

  private cellModel: EditorCellModel;
  private subscriptions: Subscription[] = [];

  @ViewChild(MwFactoryComponent) factoryComponent: MwFactoryComponent;
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

    this.subscriptions.push(
      this.messageService
        .channel(ToolPanelMessage)
        .subscribe(msg => this.handleToolPanelMessage(msg))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  handleDrop(event: DropEvent) {
    console.log('cell drop', event);
    switch (event.dragData) {
      case MwEditorTextComponent.name:
        this.model.component = new EditorTextModel();
        break;
    }
    this.messageService.publish(EditorCellMessage, {
      command: Command.drop,
      data: event
    });
  }

  handleToolPanelMessage(msg: ToolPanelMessage) {
    console.log('toolpanel msg', msg, this.model.component);
    if (msg.command === Command.delete) {
      if (
        this.model.component &&
        this.model.component.id === msg.data.componentId
      ) {
        this.model.component = undefined;
        this.factoryComponent.destroyComponent();
        this.changeDetector.markForCheck();

        console.log(
          'delete cell component',
          this.model.component,
          msg.data.componentId
        );
        this.messageService.publish(EditorCellMessage, {
          command: Command.delete
        });
      }
    }
  }
}
