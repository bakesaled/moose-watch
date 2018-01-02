import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorCellComponent } from './editor-cell.component';
import { FlexLayoutShimService } from '../../../../lib/core/services/flex-layout-shim.service';

describe('MwEditorCellComponent', () => {
  let component: MwEditorCellComponent;
  let fixture: ComponentFixture<MwEditorCellComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwEditorCellComponent],
        providers: [FlexLayoutShimService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwEditorCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
