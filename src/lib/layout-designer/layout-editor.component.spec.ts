import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwLayoutEditorComponent } from './layout-editor.component';

describe('MwLayoutEditorComponent', () => {
  let component: MwLayoutEditorComponent;
  let fixture: ComponentFixture<MwLayoutEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwLayoutEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwLayoutEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
