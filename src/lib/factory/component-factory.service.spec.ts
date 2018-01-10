import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { ComponentFactoryService } from './component-factory.service';
import {
  Component,
  ComponentFactoryResolver,
  Inject,
  ViewContainerRef
} from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MwComponentRegistry } from './component-registry';

@Component({
  template: ''
})
class TestParentComponent {
  constructor(
    public viewContainerRef: ViewContainerRef,
    @Inject(ComponentFactoryResolver)
    public factoryResolver: ComponentFactoryResolver
  ) {}
}

@Component({
  template: ''
})
class TestChildComponent {
  constructor() {}
}

describe('ComponentFactoryService', () => {
  let component: TestParentComponent;
  let fixture: ComponentFixture<TestParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestParentComponent, TestChildComponent],
      providers: [ComponentFactoryService]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TestChildComponent]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should be created',
    inject([ComponentFactoryService], (service: ComponentFactoryService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should fail to create a component that does not exist in registry',
    inject([ComponentFactoryService], (service: ComponentFactoryService) => {
      const child = service.createComponent<TestChildComponent>(
        'TestChildComponent',
        component.viewContainerRef,
        component.factoryResolver
      );
      expect(child).toBeDefined();
      expect(fixture.componentInstance.viewContainerRef.length).toBe(0);
      expect(child instanceof TestChildComponent).toBeFalsy();
    })
  );

  it(
    'should create a component',
    inject([ComponentFactoryService], (service: ComponentFactoryService) => {
      MwComponentRegistry.custom = {
        TestChildComponent: TestChildComponent
      };
      const child = service.createComponent<TestChildComponent>(
        'TestChildComponent',
        component.viewContainerRef,
        component.factoryResolver
      );
      expect(child).toBeDefined();
      expect(fixture.componentInstance.viewContainerRef.length).toBe(1);
      expect(child instanceof TestChildComponent).toBeTruthy();
    })
  );
});
