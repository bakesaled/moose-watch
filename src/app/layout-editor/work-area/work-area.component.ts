import {
  Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { MwGridComponent } from '../../../lib/grid';
import { GridModel } from '../../../lib/core/models';
import { MwTextComponent } from '../../../lib/text';
import { DropEvent, MwComponent } from '../../../lib/core/interfaces';
import { MwCellComponent } from '../../../lib/grid/cell';

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent implements OnInit {
  @ViewChild('dynamic', { read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  @ViewChildren(MwCellComponent) cellComponents: QueryList<MwCellComponent>;
  hasContent: boolean;
  allowedDropType = 'grid';

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver, private el: ElementRef) { }

  ngOnInit() {
  }

  handleDrop(event: DropEvent) {
    console.log('drop', event);
    if (event.dragData === 'grid') {
      this.hasContent = true;

      const gridComponent = this.createComponent(MwGridComponent, this.viewContainerRef) as MwGridComponent;
      gridComponent.afterViewInitEmitter.subscribe(() => {
        console.log('cells', gridComponent.cellComponents);
        gridComponent.cellComponents.forEach((cell: MwCellComponent) => {
          cell.dropSuccessEmitter.subscribe((dropEvent) => {
            console.log('work-area-cell drop', dropEvent);
            const textComponent = this.createComponent(MwTextComponent, cell.viewContainerRef);
            textComponent.editMode = true;
            cell.hasContent = true;
          });
        });
      });
      gridComponent.model = GridModel.empty;
      gridComponent.editMode = true;
    } else if (event.dragData === 'text') {
      const textComponent = this.createComponent(MwTextComponent, this.viewContainerRef);
      textComponent.editMode = true;
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

  private createComponent<T>(type: T, viewContainerRef: ViewContainerRef): MwComponent {
    const factory = this.factoryResolver
      .resolveComponentFactory(type);
    const componentRef = factory
      .create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    // componentRef.changeDetectorRef.detectChanges();
    return componentRef.instance;
  }
}
