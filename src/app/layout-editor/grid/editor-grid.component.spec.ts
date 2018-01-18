import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorGridComponent } from './editor-grid.component';
import { MwEditorCellModule } from './cell/editor-cell.module';
import { FlexLayoutShimService } from '../../../lib/core/services/flex-layout-shim.service';
import { SelectionTagModule } from '../../shared/selection-tag/selection-tag.module';
import { DndModule } from 'ng2-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('MwEditorGridComponent', () => {
  let component: MwEditorGridComponent;
  let fixture: ComponentFixture<MwEditorGridComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwEditorGridComponent],
        imports: [
          MwEditorCellModule,
          SelectionTagModule,
          DndModule.forRoot(),
          FlexLayoutModule
        ],
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
