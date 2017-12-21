import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwCellComponent } from './cell.component';

describe('MwEditorCellComponent', () => {
  let component: MwCellComponent;
  let fixture: ComponentFixture<MwCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
