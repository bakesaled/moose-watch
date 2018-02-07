import {
  ComponentFactoryResolver,
  Directive,
  forwardRef,
  Inject,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { TabBodyComponent } from './tab-body.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';

@Directive({
  selector: '[mwTabBodyHost]'
})
export class TabBodyHostDirective extends CdkPortalOutlet implements OnInit {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    @Inject(forwardRef(() => TabBodyComponent))
    private host: TabBodyComponent
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  ngOnInit() {
    this.attach(this.host.content);
  }
}
