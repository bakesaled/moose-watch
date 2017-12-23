import {
  Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { MwEditorCellComponent } from '../grid/cell';
import { MwEditorGridComponent } from '../grid';
import { DropEvent, MwEditorComponent } from '../../core/interfaces';
import { CellModel } from '../../core/models/cell.model';
import { MessageService, SaveService } from '../../core/services';
import { ToolPanelMessage } from '../../core';
import { Subscription } from 'rxjs/Subscription';
import { MwEditorTextComponent } from '../text';

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class MwWorkAreaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private rootGridComponent: MwEditorGridComponent;

  @ViewChild('dynamic', { read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  @ViewChildren(MwEditorCellComponent) cellComponents: QueryList<MwEditorCellComponent>;
  hasContent: boolean;
  allowedDropType = 'grid';

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver, private messageService: MessageService,
              private saveService: SaveService) { }

  ngOnInit() {
    this.subscriptions.push(this.messageService.channel(ToolPanelMessage).subscribe((msg => {
      console.log('toolpanel msg', msg);
      this.rootGridComponent.cellComponents.forEach((cell) => {
        if (cell.id === msg.data.parentId) {
          cell.viewContainerRef.clear();
          cell.hasContent = false;
        }
      });
    })));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  handleDrop(event: DropEvent) {
    console.log('drop', event);
    if (event.dragData === 'grid') {
      this.hasContent = true;

      this.rootGridComponent = this.createComponent(MwEditorGridComponent, this.viewContainerRef) as MwEditorGridComponent;
      this.rootGridComponent.cells = [
        CellModel.emptyEdit,
        CellModel.emptyEdit
      ];
      this.rootGridComponent.cells[0].width = 50;
      this.rootGridComponent.cells[1].width = 50;
      this.rootGridComponent.afterViewInitEmitter.subscribe(() => {
        console.log('cells', this.rootGridComponent.cellComponents);
        this.rootGridComponent.cellComponents.forEach((cell: MwEditorCellComponent) => {
          cell.dropSuccessEmitter.subscribe((dropEvent) => {
            console.log('work-area-cell drop', dropEvent);
            const textComponent = this.createComponent(MwEditorTextComponent, cell.viewContainerRef);
            // textComponent.editMode = true;
            cell.hasContent = true;
            this.saveService.save('layout', 'blah');
          });
        });
      });
    } else if (event.dragData === 'text') {
      const textComponent = this.createComponent(MwEditorTextComponent, this.viewContainerRef);
      // textComponent.editMode = true;
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

  private createComponent<T>(type: T, viewContainerRef: ViewContainerRef): MwEditorComponent {
    const factory = this.factoryResolver
      .resolveComponentFactory(type);
    const componentRef = factory
      .create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    // componentRef.changeDetectorRef.detectChanges();
    return componentRef.instance;
  }
}
