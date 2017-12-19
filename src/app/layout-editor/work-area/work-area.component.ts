import {
  Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MwGridComponent } from '../../../lib/grid';
import { GridModel } from '../../../lib/core/models';
import { MwTextComponent } from '../../../lib/text';
import { MwComponent } from '../../../lib/core/mw.component';

interface DropEvent {
  dragData: any;
  mouseEvent: DragEvent;
}

@Component({
  selector: 'mw-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent implements OnInit {
  @ViewChild('dynamic', { read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  hasContent: boolean;

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver, private el: ElementRef) { }

  ngOnInit() {
  }

  handleDrop(event: DropEvent) {
    console.log('drop', event);
    if (event.dragData === 'grid') {
      this.hasContent = true;

      const gridComponent = this.createComponent(MwGridComponent);
      gridComponent.model = GridModel.empty;
      gridComponent.editMode = true;
    } else if (event.dragData === 'text') {
      const textComponent = this.createComponent(MwTextComponent);
      textComponent.editMode = true;
    }
  }

  private createComponent<T>(type: T): MwComponent {
    const factory = this.factoryResolver
      .resolveComponentFactory(type);
    const componentRef = factory
      .create(this.viewContainerRef.parentInjector);
    this.viewContainerRef.insert(componentRef.hostView);
    return componentRef.instance;
  }
}
