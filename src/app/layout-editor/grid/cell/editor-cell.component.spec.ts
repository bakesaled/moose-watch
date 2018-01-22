import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorCellComponent } from './editor-cell.component';
import { FlexLayoutShimService } from '../../../../lib/core/services/flex-layout-shim.service';
import { MwFactoryComponent } from '../../../../lib/factory/factory.component';
import { ComponentFactoryService } from '../../../../lib/factory/component-factory.service';
import { MessageService } from '../../../core/services';
import { Command } from '../../../core/enums';
import { MockEditorComponentModel } from '../../../core/mocks/editor-component-model.mock';

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

  it('should delete component', () => {
    component.model.component = new MockEditorComponentModel();
    component.handleToolPanelMessage({
      command: Command.delete,
      data: {
        componentId: 'testId'
      }
    });
    console.log('cell comp', component.model.component);
    expect(component.model.component).toBeUndefined();
  });
});
