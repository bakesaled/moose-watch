import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorGridComponent } from './editor-grid.component';
import { MwEditorCellModule } from './cell/editor-cell.module';
import { MwGridModule } from '../../../lib/grid/grid.module';
import { MwTextModule } from '../../../lib/text/text.module';
import { FlexLayoutShimService } from '../../../lib/core/services';

describe('MwEditorGridComponent', () => {
  let component: MwEditorGridComponent;
  let fixture: ComponentFixture<MwEditorGridComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwEditorGridComponent],
        imports: [MwEditorCellModule, MwGridModule, MwTextModule],
        providers: [FlexLayoutShimService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwEditorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
