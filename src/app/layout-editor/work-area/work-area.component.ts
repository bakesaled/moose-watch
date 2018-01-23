import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from '../grid/cell';
import { DropEvent } from '../../core/interfaces';
import {
  LayoutListService,
  MessageService,
  SaveService
} from '../../core/services';
import { Subscription } from 'rxjs/Subscription';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { Command } from '../../core/enums';
import { EditorComponentMessage, WorkAreaMessage } from '../../core/messages';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import { LayoutService } from '../../../lib/layout/layout.service';
import { EditorCellModel, EditorGridModel, EditorLayoutModel } from '../models';
import { EditorCellMessage } from '../../core/messages';
import { ToolbarMessage } from '../../core/messages';
import { Constants, ToolPanelMessage } from '../../core';
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

  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @ViewChildren(MwEditorCellComponent)
  cellComponents: QueryList<MwEditorCellComponent>;
  allowedDropType = 'MwEditorGridComponent';
  layoutModel: EditorLayoutModel;

  @ViewChild(MwFactoryComponent) factoryComponent: MwFactoryComponent;

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
        if (this.factoryComponent) {
          this.factoryComponent.destroyComponent();
        }
        const editorLayoutModel = new EditorLayoutModel().toEditorModel(
          data.layout
        );
        this.layoutModel = Object.assign(editorLayoutModel, {});
        this.changeDetector.markForCheck();
      })
    );

    this.subscriptions.push(
      this.messageService
        .channel(ToolPanelMessage)
        .subscribe(msg => this.handleToolPanelMessage(msg))
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
      this.messageService.channel(EditorComponentMessage).subscribe(msg => {
        if (msg.command === Command.propertyChange ) {
          this.save();
        }
        console.log('component msg', msg);
      })
    );

    this.subscriptions.push(
      this.messageService
        .channel(ToolbarMessage)
        .subscribe(msg => this.deleteLayout(msg))
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
      if (dragData !== data) {
        console.log('drop not allowed', dragData);
      }

      return dragData === data;
    };
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

  private deleteLayout(msg: ToolbarMessage) {
    if (msg.command === Command.delete) {
      this.saveService.delete(this.layoutModel.id);
      this.messageService.publish(WorkAreaMessage, {
        command: Command.delete
      });
    }
  }

  handleToolPanelMessage(msg: ToolPanelMessage) {
    console.log('toolpanel msg', msg, this.layoutModel.component);
    if (msg.command === Command.delete) {
      if (
        this.layoutModel.component &&
        this.layoutModel.component.id === msg.data.componentId
      ) {
        this.layoutModel.component = undefined;
        if (this.factoryComponent) {
          this.factoryComponent.destroyComponent();
        }
        this.changeDetector.markForCheck();

        console.log(
          'delete layout component',
          this.layoutModel.component,
          msg.data.componentId
        );
        this.save();
      }
    }
  }
}
