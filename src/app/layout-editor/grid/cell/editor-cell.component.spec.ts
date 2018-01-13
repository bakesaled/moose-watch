import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorCellComponent } from './editor-cell.component';
import { FlexLayoutShimService } from '../../../../lib/core/services/flex-layout-shim.service';
import { MwFactoryComponent } from '../../../../lib/factory/factory.component';
import { ComponentFactoryService } from '../../../../lib/factory/component-factory.service';
import { MessageService } from '../../../core/services';

describe('MwEditorCellComponent', () => {
  let component: MwEditorCellComponent;
  let fixture: ComponentFixture<MwEditorCellComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwEditorCellComponent, MwFactoryComponent],
        providers: [
          FlexLayoutShimService,
          ComponentFactoryService,
          MessageService
        ]
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
