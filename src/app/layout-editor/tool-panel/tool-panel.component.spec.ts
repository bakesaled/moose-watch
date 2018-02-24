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
import { RouterTestingModule } from '@angular/router/testing';

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
          SlideTabsModule,
          RouterTestingModule
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

  it('should set selected component model and set selected index to 1', () => {
    const mockComponentModel = new MockEditorComponentModel();
    component.selectedComponentModel = mockComponentModel;
    const spy = spyOn(component, 'handleSelectedIndexChange');
    component['handleEditorComponentMessage']({
      command: Command.select,
      data: mockComponentModel
    });
    expect(component.selectedComponentModel).toBe(mockComponentModel);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should set selected component model and set selected index to 0', () => {
    const mockComponentModel = new MockEditorComponentModel();
    component.selectedComponentModel = mockComponentModel;
    component['selectedTabIndex'] = 1;
    const spy = spyOn(component, 'handleSelectedIndexChange');
    component['handleEditorComponentMessage']({
      command: Command.select,
      data: undefined
    });
    expect(component.selectedComponentModel).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(0);
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
