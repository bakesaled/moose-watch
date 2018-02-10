import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwToolPanelComponent } from './tool-panel.component';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import { MessageService } from '../../core/services';
import { DndModule } from 'ng2-dnd';
import { MwPropertyEditorModule } from '../property-editor/property-editor.module';
import { MockEditorComponentModel } from '../../core/mocks/editor-component-model.mock';
import { Command } from '../../core/enums';
import { ToolPanelMessage } from '../../core/messages';
import { MwComponentPickerModule } from '../component-picker/component-picker.module';
import { SlideTabsModule } from '../slide-tabs/slide-tabs.module';

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
          MwComponentPickerModule,
          MwPropertyEditorModule,
          SlideTabsModule
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
    component.handleSelectedIndexChange(undefined);
    expect(spy).toHaveBeenCalledWith(ToolPanelMessage, {
      command: Command.toolNavToggle,
      data: true
    });
  });
});
