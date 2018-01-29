import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwToolPanelComponent } from './tool-panel.component';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import { MessageService } from '../../core/services';
import { DndModule } from 'ng2-dnd';
import { PropertyEditorModule } from '../property-editor/property-editor.module';
import { MockEditorComponentModel } from '../../core/mocks/editor-component-model.mock';
import { Command } from '../../core/enums';
import { ToolbarMessage } from '../../core/messages/toolbar.message';
import { ToolPanelMessage } from '../../core/messages';

describe('MwToolPanelComponent', () => {
  let component: MwToolPanelComponent;
  let fixture: ComponentFixture<MwToolPanelComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwToolPanelComponent],
        imports: [
          MatIconModule,
          MatSidenavModule,
          MatListModule,
          DndModule.forRoot(),
          PropertyEditorModule
        ],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwToolPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected component model', () => {
    const mockComponentModel = new MockEditorComponentModel();
    component.selectedComponentModel = mockComponentModel;
    component['handleEditorComponentMessage']({
      command: Command.select,
      data: mockComponentModel
    });
    expect(component.selectedComponentModel).toBe(mockComponentModel);
  });

  it('should publish a message on tool nav toggle button click', () => {
    const spy = spyOn(component['messageService'], 'publish');
    component.onToolNavToggleClick();
    expect(spy).toHaveBeenCalledWith(ToolPanelMessage, {
      command: Command.toolNavToggle
    });
  });
});
