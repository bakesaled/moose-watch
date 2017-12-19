import {
  Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MwGridComponent } from '../../../lib/grid';
import { GridModel } from '../../../lib/core/models';

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
    this.hasContent = true;

    const factory = this.factoryResolver
      .resolveComponentFactory(MwGridComponent);
    const componentRef = factory
      .create(this.viewContainerRef.parentInjector);
    this.viewContainerRef.insert(componentRef.hostView);
    const gridComponent = componentRef.instance as MwGridComponent;
    gridComponent.model = GridModel.empty;
    gridComponent.editMode = true;
  }
}
