import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwToolPanelComponent } from './tool-panel.component';

describe('MwToolPanelComponent', () => {
  let component: MwToolPanelComponent;
  let fixture: ComponentFixture<MwToolPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwToolPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwToolPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
