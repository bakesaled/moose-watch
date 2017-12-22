import {
  Component, ComponentFactoryResolver, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { MwTextComponent } from '../../text/index';
import { MwEditorCellComponent } from '../grid/cell';
import { MwEditorGridComponent } from '../grid';
import { MwDesignerComponent } from '../../core/interfaces/mw-designer.component';
import { DropEvent } from '../../core/interfaces';
import { CellModel } from '../../core/models/cell.model';
import { MessageService } from '../../core/services';
import { ToolPanelMessage } from '../../core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class MwWorkAreaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @ViewChild('dynamic', { read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  @ViewChildren(MwEditorCellComponent) cellComponents: QueryList<MwEditorCellComponent>;
  hasContent: boolean;
  allowedDropType = 'grid';

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver, private messageService: MessageService) { }

  ngOnInit() {
    this.subscriptions.push(this.messageService.channel(ToolPanelMessage).subscribe((msg => {
      console.log('toolpanel msg', msg);
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

      const gridComponent = this.createComponent(MwEditorGridComponent, this.viewContainerRef) as MwEditorGridComponent;
      gridComponent.cells = [
        CellModel.emptyEdit,
        CellModel.emptyEdit
      ];
      gridComponent.cells[0].width = 50;
      gridComponent.cells[1].width = 50;
      gridComponent.afterViewInitEmitter.subscribe(() => {
        console.log('cells', gridComponent.cellComponents);
        gridComponent.cellComponents.forEach((cell: MwEditorCellComponent) => {
          cell.dropSuccessEmitter.subscribe((dropEvent) => {
            console.log('work-area-cell drop', dropEvent);
            const textComponent = this.createComponent(MwTextComponent, cell.viewContainerRef);
            // textComponent.editMode = true;
            cell.hasContent = true;
          });
        });
      });
    } else if (event.dragData === 'text') {
      const textComponent = this.createComponent(MwTextComponent, this.viewContainerRef);
      // textComponent.editMode = true;
    }
  }

  handleAllowDrop(data: any) {
    return (dragData: any) => {
      if (dragData !== data) {
        console.log('drop not allowed', dragData);
      }

      return dragData === data;
    }
  }

  private createComponent<T>(type: T, viewContainerRef: ViewContainerRef): MwDesignerComponent {
    const factory = this.factoryResolver
      .resolveComponentFactory(type);
    const componentRef = factory
      .create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    // componentRef.changeDetectorRef.detectChanges();
    return componentRef.instance;
  }
}
