import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwFactoryComponent } from './factory.component';
import { ComponentFactoryService } from './component-factory.service';

describe('MwFactoryComponent', () => {
  let component: MwFactoryComponent;
  let fixture: ComponentFixture<MwFactoryComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwFactoryComponent],
        providers: [ComponentFactoryService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
