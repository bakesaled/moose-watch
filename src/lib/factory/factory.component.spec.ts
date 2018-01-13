import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwFactoryComponent } from './factory.component';
import { ComponentFactoryService } from './component-factory.service';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MwNoComponent } from '../no-component/no.component';

@Component({
  template: `
    <mw-factory [model]="model"></mw-factory>
  `
})
class MockFactoryContainerComponent {
  model = {
    id: 'testId',
    type: 'MwNoComponent'
  };
  @ViewChild(MwFactoryComponent) factoryComponent: MwFactoryComponent;
}

class MockComponentFactoryService {
  createComponent<T>(
    typeKey: string,
    viewContainerRef: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ): MwNoComponent {
    const factory = factoryResolver.resolveComponentFactory(MwNoComponent);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    return componentRef.instance;
  }
}

describe('MwFactoryComponent', () => {
  let component: MockFactoryContainerComponent;
  let fixture: ComponentFixture<MockFactoryContainerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          MwFactoryComponent,
          MockFactoryContainerComponent,
          MwNoComponent
        ],
        providers: [
          {
            provide: ComponentFactoryService,
            useClass: MockComponentFactoryService
          }
        ]
      });

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [MwNoComponent]
        }
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFactoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and remove component from ViewContainerRef', () => {
    expect(component.factoryComponent['viewContainerRef'].length).toBe(1);
    component.factoryComponent.destroyComponent();
    expect(component.factoryComponent['viewContainerRef'].length).toBe(0);
  });
});
