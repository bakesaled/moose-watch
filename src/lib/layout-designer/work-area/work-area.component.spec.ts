import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwWorkAreaComponent } from './work-area.component';

describe('MwWorkAreaComponent', () => {
  let component: MwWorkAreaComponent;
  let fixture: ComponentFixture<MwWorkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwWorkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwWorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
