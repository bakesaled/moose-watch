import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from './cell';
import { FlexLayoutShimService } from '../../../lib/core/services/flex-layout-shim.service';
import { EditorGridModel } from '../models';
import {
  EditorComponentMessage,
  PropertyEditorMessage
} from '../../core/messages';
import { Command } from '../../core/enums';
import { MessageService } from '../../core/services';
import { Subscription } from 'rxjs/Subscription';
import { MwSelectableEditorComponent } from '../../core/interfaces/mw-selectable-editor.component';

@Component({
  selector: 'mw-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorGridComponent
  implements OnInit, AfterViewInit, MwSelectableEditorComponent, OnDestroy {
  @HostBinding('class.mw-editor-grid') editorGridClass = true;
  @HostBinding('style.backgroundColor') backgroundColor;

  fxLayout = 'row';
  style;
  dragEnabled = false;

  private subscriptions: Subscription[] = [];
  private gridModel: EditorGridModel;
  private isSelected = false;

  get selected(): boolean {
    return this.isSelected;
  }
  set selected(newValue: boolean) {
    this.isSelected = newValue;
    this.changeDetector.markForCheck();
  }

  @ViewChildren(MwEditorCellComponent)
  cellComponents: QueryList<MwEditorCellComponent>;

  @ViewChild('dragHandle') dragHandleRef: ElementRef;

  @Output() afterViewInitEmitter = new EventEmitter<void>();

  @Input()
  get model(): EditorGridModel {
    return this.gridModel;
  }
  set model(newValue: EditorGridModel) {
    this.gridModel = newValue;
    this.style = this.flexShim.getStyle('fxLayout', 'row');
    this.backgroundColor = this.gridModel.backgroundColor;
    this.changeDetector.markForCheck();
    console.log('gridModel', this.gridModel);
  }

  constructor(
    private flexShim: FlexLayoutShimService,
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorGridModel();
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

  ngAfterViewInit() {
    this.afterViewInitEmitter.emit();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onMouseEnter() {
    this.dragEnabled = true;
  }

  onMouseOut() {
    this.dragEnabled = false;
  }

  onclick(event: MouseEvent) {
    // ignore clicks on child elements.
    if (event.target !== this.dragHandleRef.nativeElement) {
      return;
    }

    this.selected = !this.selected;
    this.messageService.publish(EditorComponentMessage, {
      command: Command.select,
      data: this.isSelected ? this.model : undefined
    });
  }

  private handleEditorComponentMessage(msg: EditorComponentMessage) {
    if (msg.command === Command.select) {
      if (this.selected && msg.data !== this.model) {
        this.selected = false;
      }
    }
  }

  private handlePropertyEditorMessage(msg: PropertyEditorMessage) {
    if (
      msg.command === Command.propertyChange &&
      msg.data.id === this.model.id
    ) {
      this.model = msg.data;
      this.notify();
    }
  }

  private notify() {
    this.messageService.publish(EditorComponentMessage, {
      command: Command.propertyChange
    });
  }
}
