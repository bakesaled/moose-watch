import {
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { MwComponentRegistry } from './component-registry';

@Injectable()
export class ComponentFactoryService {
  constructor() {}

  createComponent<T>(
    typeKey: string,
    viewContainerRef: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ): T {
    let type: Type<T>;
    if (typeof typeKey === 'string') {
      type = MwComponentRegistry.getType(typeKey);

      if (!type) {
        console.error(`type ${typeKey} is undefined`);
        return null;
      }
    }

    const factory = factoryResolver.resolveComponentFactory(type);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    // componentRef.changeDetectorRef.detectChanges();
    return componentRef.instance;
  }
}
