import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryComponent } from './factory.component';
import { ComponentFactoryService } from './component-factory.service';

describe('FactoryComponent', () => {
  let component: FactoryComponent;
  let fixture: ComponentFixture<FactoryComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FactoryComponent],
        providers: [ComponentFactoryService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
