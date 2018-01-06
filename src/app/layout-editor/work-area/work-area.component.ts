import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from '../grid/cell';
import { MwEditorGridComponent } from '../grid';
import { DropEvent, MwEditorComponent } from '../../core/interfaces';
import { MessageService, SaveService } from '../../core/services';
import { ToolPanelMessage } from '../../core';
import { Subscription } from 'rxjs/Subscription';
import { MwEditorTextComponent } from '../text';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { GridModel } from '../../../lib/core/models/grid.model';
import { CellModel } from '../../../lib/core/models/cell.model';
import { Command } from '../../core/enums';
import { WorkAreaMessage } from '../../core/messages/work-area.message';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { LayoutService } from '../../../lib/layout/layout.service';
import { LayoutRetrievalStrategy } from '../../../lib/layout/layout-retrieval-strategy';

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwWorkAreaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private layoutModel: LayoutModel;
  private rootGridComponent: MwEditorGridComponent;

  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @ViewChildren(MwEditorCellComponent)
  cellComponents: QueryList<MwEditorCellComponent>;
  hasContent: boolean;
  allowedDropType = 'grid';

  constructor(
    @Inject(ComponentFactoryResolver)
    private factoryResolver: ComponentFactoryResolver,
    private messageService: MessageService,
    private saveService: SaveService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      Observable.combineLatest(
        this.route.params,
        this.route.queryParams,
        (params, qparams) => ({ params, qparams })
      ).subscribe(value => {
        const isNew = value.qparams['new'] === 'true';
        if (isNew) {
          this.layoutModel = new LayoutModel(
            value.params['id'],
            'new-layout',
            LayoutRetrievalStrategy.localStorage
          );
        } else {
          const layout = new LayoutModel(
            value.params['id'],
            value.qparams['name'],
            LayoutRetrievalStrategy.localStorage
          );
          console.log('oopopopo', layout);
          const retrievalStrategy = value.qparams['retrievalStrategy'];
          if (retrievalStrategy) {
            layout.retrievalStrategy = +retrievalStrategy;
          }
          this.layoutService.get(layout).subscribe(model => {
            this.layoutModel = model;
            this.buildExistingLayout();
            this.changeDetector.markForCheck();
          });
        }
      })
    );

    this.subscriptions.push(
      this.messageService.channel(ToolPanelMessage).subscribe(msg => {
        console.log('toolpanel msg', msg);
        this.rootGridComponent.cellComponents.forEach(cell => {
          console.log('check delete', cell.model.id, msg.data.parentId);
          if (cell.model.id === msg.data.parentId) {
            cell.viewContainerRef.clear();
            cell.hasContent = false;
          }
        });
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
    if (event.dragData === 'grid') {
      this.hasContent = true;

      this.rootGridComponent = this.createComponent(
        MwEditorGridComponent,
        this.viewContainerRef
      ) as MwEditorGridComponent;
      this.layoutModel.grid = new GridModel();
      this.layoutModel.grid.cells = [new CellModel(), new CellModel()];
      this.rootGridComponent.model = this.layoutModel.grid;
      this.rootGridComponent.afterViewInitEmitter.subscribe(() => {
        console.log('cells', this.rootGridComponent.cellComponents);
        this.rootGridComponent.cellComponents.forEach(
          (cell: MwEditorCellComponent) => {
            cell.dropSuccessEmitter.subscribe(dropEvent => {
              console.log('work-area-cell drop', dropEvent);
              const textComponent = this.createComponent(
                MwEditorTextComponent,
                cell.viewContainerRef
              );
              // this.layoutModel.grid.cells.filter((cell) => {
              //
              // })
              // textComponent.editMode = true;
              cell.hasContent = true;
              // this.saveService.save(this.layoutModel);
            });
          }
        );
      });
    } else if (event.dragData === 'text') {
      const textComponent = this.createComponent(
        MwEditorTextComponent,
        this.viewContainerRef
      );
      // textComponent.editMode = true;
    }

    this.saveService.save(this.layoutModel);

    this.messageService.publish(WorkAreaMessage, {
      command: Command.edit,
      data: event
    });
  }

  handleAllowDrop(data: any) {
    return (dragData: any) => {
      if (dragData !== data) {
        console.log('drop not allowed', dragData);
      }

      return dragData === data;
    };
  }

  private buildExistingLayout() {
    this.rootGridComponent = this.createComponent(
      MwEditorGridComponent,
      this.viewContainerRef
    ) as MwEditorGridComponent;
    this.rootGridComponent.model = this.layoutModel.grid;
    this.rootGridComponent.afterViewInitEmitter.subscribe(() => {
      console.log('cells', this.rootGridComponent.cellComponents);
      this.rootGridComponent.cellComponents.forEach(
        (cell: MwEditorCellComponent) => {
          cell.dropSuccessEmitter.subscribe(dropEvent => {
            console.log('work-area-cell drop', dropEvent);
            const textComponent = this.createComponent(
              MwEditorTextComponent,
              cell.viewContainerRef
            );
            // this.layoutModel.grid.cells.filter((cell) => {
            //
            // })
            // textComponent.editMode = true;
            cell.hasContent = true;
            // this.saveService.save(this.layoutModel);
          });
        }
      );
    });
  }

  private createComponent<T>(
    type: Type<T>,
    viewContainerRef: ViewContainerRef
  ): MwEditorComponent {
    const factory = this.factoryResolver.resolveComponentFactory(type);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    // componentRef.changeDetectorRef.detectChanges();
    return <any>componentRef.instance;
  }
}
