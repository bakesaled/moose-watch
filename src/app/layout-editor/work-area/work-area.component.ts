import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
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
import { ToolPanelMessage } from '../../core';
import { Subscription } from 'rxjs/Subscription';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { Command } from '../../core/enums';
import { WorkAreaMessage } from '../../core/messages/work-area.message';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import { LayoutService } from '../../../lib/layout/layout.service';
import {
  EditorCellModel,
  EditorGridModel,
  EditorLayoutModel
} from '../../core/models';
import { EditorCellMessage } from '../../core/messages/editor-cell.message';
import { MwGridComponent } from '../../../lib/grid/grid.component';

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwWorkAreaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @ViewChildren(MwEditorCellComponent)
  cellComponents: QueryList<MwEditorCellComponent>;
  allowedDropType = MwGridComponent.name;
  layoutModel: EditorLayoutModel;

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
        const editorLayoutModel = new EditorLayoutModel().toEditorModel(
          data.layout
        );
        this.layoutModel = Object.assign(editorLayoutModel, {});
        this.changeDetector.markForCheck();
      })
    );

    // this.subscriptions.push(
    //   this.messageService.channel(ToolPanelMessage).subscribe(msg => {
    //     console.log('toolpanel msg', msg);
    //     let indexToDelete = -1;
    //     for (let i = 0; i < this.layoutModel.grid.cells.length; i++) {
    //       const cell = this.layoutModel.grid.cells[i];
    //       console.log('check delete', cell.id, msg.data.parentId);
    //       if (cell.id === msg.data.parentId) {
    //         indexToDelete = i;
    //         break;
    //       }
    //     }
    //     this.layoutModel.grid.cells.splice(indexToDelete, 1);
    //   })
    // );

    this.subscriptions.push(
      this.messageService.channel(EditorCellMessage).subscribe(msg => {
        if (msg.command === Command.drop || msg.command === Command.delete) {
          this.save();
        }
        console.log('cell msg', msg);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  handleDrop(event: DropEvent) {
    console.log('drop', event);
    if (event.dragData === MwGridComponent.name) {
      const grid = new EditorGridModel();
      grid.cells = [new EditorCellModel(), new EditorCellModel()];
      this.layoutModel.grid = grid;
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
    if (this.layoutModel.isNew) {
      this.layoutModel.name = this.layoutListService.getUniqueLayoutName(
        'new-layout'
      );
    }
    this.layoutModel.isNew = false;
    console.log('saving', this.layoutModel.toViewerModel());
    this.saveService.save(this.layoutModel.toViewerModel());

    this.messageService.publish(WorkAreaMessage, {
      command: Command.edit,
      data: undefined
    });
  }
}
