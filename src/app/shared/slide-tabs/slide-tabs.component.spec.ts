import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTabsComponent } from './slide-tabs.component';

describe('SlideTabsComponent', () => {
  let component: SlideTabsComponent;
  let fixture: ComponentFixture<SlideTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
