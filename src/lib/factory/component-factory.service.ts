import {
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { componentRegistry } from './component-registry';

@Injectable()
export class ComponentFactoryService {
  constructor() {}

  createComponent<T>(
    type: Type<T> | string,
    viewContainerRef: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ): T {
    const originalType = type;
    if (typeof type === 'string') {
      type = componentRegistry.find(val => {
        return val.name === type;
      });

      if (!type) {
        console.error(`type ${originalType} is undefined`);
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
