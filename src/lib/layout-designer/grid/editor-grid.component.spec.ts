import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorGridComponent } from './editor-grid.component';

describe('MwEditorGridComponent', () => {
  let component: MwEditorGridComponent;
  let fixture: ComponentFixture<MwEditorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwEditorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwEditorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
