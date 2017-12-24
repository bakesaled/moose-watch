import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorGridComponent } from './editor-grid.component';
import { MwEditorCellModule } from './cell/editor-cell.module';
import { FlexLayoutShimService } from '../../core/services';
import { MwGridModule } from '../../grid/grid.module';
import { MwTextModule } from '../../text/text.module';

describe('MwEditorGridComponent', () => {
  let component: MwEditorGridComponent;
  let fixture: ComponentFixture<MwEditorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwEditorGridComponent ],
      imports: [
        MwEditorCellModule,
        MwGridModule,
        MwTextModule
      ],
      providers: [
        FlexLayoutShimService
      ]
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
