import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnChanges,
  ViewContainerRef
} from '@angular/core';
import { ComponentFactoryService } from './component-factory.service';
import { MwComponentModel } from '../core/interfaces/mw-component.model';

@Component({
  selector: 'mw-factory',
  template: ''
})
export class MwFactoryComponent implements OnChanges {
  @Input() public model: MwComponentModel;

  constructor(
    private factoryService: ComponentFactoryService,
    private viewContainerRef: ViewContainerRef,
    @Inject(ComponentFactoryResolver)
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges() {
    this.createComponent();
  }

  createComponent() {
    if (!this.model) {
      return;
    }
    const component = this.factoryService.createComponent(
      this.model.type,
      this.viewContainerRef,
      this.factoryResolver
    );
    component.model = this.model;
  }
}
