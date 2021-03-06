import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DropEvent } from '../../core/interfaces';
import {
  LayoutListService,
  MessageService,
  SaveService
} from '../../core/services';
import { Subscription } from 'rxjs/Subscription';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { Command } from '../../core/enums';
import {
  EditorComponentMessage,
  PropertyEditorMessage,
  WorkAreaMessage
} from '../../core/messages';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import { LayoutService } from '../../../lib/layout/layout.service';
import { EditorCellModel, EditorGridModel, EditorLayoutModel } from '../models';
import { EditorCellMessage } from '../../core/messages';
import { ToolbarMessage } from '../../core/messages';
import { Constants } from '../../core';
import { Guid } from '../../core/utils';
import { MwEditorGridComponent } from '../grid';
import { MwFactoryComponent } from '../../../lib/factory/factory.component';

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwWorkAreaComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-work-area') workAreaClass = true;

  private subscriptions: Subscription[] = [];
  private isSelected = false;

  get selected(): boolean {
    return this.isSelected;
  }
  set selected(newValue: boolean) {
    this.isSelected = newValue;
    this.changeDetector.markForCheck();
  }

  allowedDropType = 'MwEditorGridComponent';
  layoutModel: EditorLayoutModel;

  @ViewChild(MwFactoryComponent) factoryComponent: MwFactoryComponent;
  @ViewChild('workAreaTarget') workAreaTargetRef: ElementRef;

  constructor(
    @Inject(ComponentFactoryResolver)
    private factoryResolver: ComponentFactoryResolver,
    private messageService: MessageService,
    private saveService: SaveService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private layoutListService: LayoutListService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe((data: { layout: LayoutModel }) => {
        this.destroyFactoryComponent();
        const editorLayoutModel = new EditorLayoutModel().toEditorModel(
          data.layout
        );
        this.layoutModel = Object.assign(editorLayoutModel, {});
        this.selected = false;
        this.changeDetector.markForCheck();
      })
    );

    this.subscriptions.push(
      this.messageService.channel(EditorCellMessage).subscribe(msg => {
        if (msg.command === Command.drop || msg.command === Command.delete) {
          this.save();
        }
        console.log('cell msg', msg);
      })
    );

    this.subscriptions.push(
      this.messageService
        .channel(EditorComponentMessage)
        .subscribe(msg => this.handleEditorComponentMessage(msg))
    );

    this.subscriptions.push(
      this.messageService
        .channel(ToolbarMessage)
        .subscribe(msg => this.handleToolbarMessage(msg))
    );

    this.subscriptions.push(
      this.messageService
        .channel(PropertyEditorMessage)
        .subscribe(msg => this.handlePropertyEditorMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  handleDrop(event: DropEvent) {
    console.log('drop', event);
    if (event.dragData === 'MwEditorGridComponent') {
      const grid = new EditorGridModel();
      grid.cells = [
        new EditorCellModel(Guid.create(), 50),
        new EditorCellModel(Guid.create(), 50)
      ];
      this.layoutModel.component = grid;
      this.changeDetector.markForCheck();
      this.save();
    }
  }

  handleAllowDrop(data: any) {
    return (dragData: any) => {
      return dragData === data;
    };
  }

  onclick(event: MouseEvent) {
    // ignore clicks on child elements.
    if (event.target !== this.workAreaTargetRef.nativeElement) {
      return;
    }

    this.selected = !this.selected;
    this.messageService.publish(EditorComponentMessage, {
      command: Command.select,
      data: this.isSelected ? this.layoutModel : undefined
    });
  }

  private save() {
    console.log('saving', this.layoutModel);
    let isNew = false;
    if (this.layoutModel.isNew) {
      isNew = true;
      this.layoutModel.name = this.layoutListService.getUniqueLayoutName(
        Constants.newLayoutBaseName
      );
    }
    this.layoutModel.isNew = false;
    this.saveService.save(this.layoutModel.toViewerModel());

    this.messageService.publish(WorkAreaMessage, {
      command: Command.edit,
      data: isNew
        ? { id: this.layoutModel.id, name: this.layoutModel.name }
        : undefined
    });
  }

  private handleToolbarMessage(msg: ToolbarMessage) {
    if (msg.command === Command.delete) {
      console.log('work-area delete', msg);
      if (msg.data) {
        this.deleteComponent(msg);
      } else {
        this.deleteLayout();
      }
    }
  }

  private deleteLayout() {
    if (this.selected) {
      this.saveService.delete(this.layoutModel.id);
      this.messageService.publish(WorkAreaMessage, {
        command: Command.delete
      });
    }
  }

  private deleteComponent(msg: ToolbarMessage) {
    console.log(
      'deleting layout component',
      this.layoutModel.component,
      msg.data.componentId
    );
    if (
      this.layoutModel.component &&
      this.layoutModel.component.id === msg.data.componentId
    ) {
      this.layoutModel.component = undefined;
      this.destroyFactoryComponent();
      this.changeDetector.markForCheck();

      console.log(
        'delete layout component',
        this.layoutModel.component,
        msg.data.componentId
      );
      this.save();
    }
  }

  private handleEditorComponentMessage(msg: EditorComponentMessage) {
    console.log('component msg', msg);
    if (msg.command === Command.propertyChange) {
      this.save();
    } else if (msg.command === Command.select) {
      if (this.selected && msg.data !== this.layoutModel) {
        this.selected = false;
      }
    }
  }

  private handlePropertyEditorMessage(msg: PropertyEditorMessage) {
    if (
      msg.command === Command.propertyChange &&
      msg.data.id === this.layoutModel.id
    ) {
      this.layoutModel = msg.data;
      this.save();
    }
  }

  private destroyFactoryComponent() {
    if (this.factoryComponent) {
      this.factoryComponent.destroyComponent();
    }
  }
}
