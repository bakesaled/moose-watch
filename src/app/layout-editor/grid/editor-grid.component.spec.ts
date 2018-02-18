import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorGridComponent } from './editor-grid.component';
import { MwEditorCellModule } from './cell/editor-cell.module';
import { FlexLayoutShimService } from '../../../lib/core/services/flex-layout-shim.service';
import { SelectionTagModule } from '../selection-tag/selection-tag.module';
import { DndModule } from 'ng2-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorComponentMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { EditorGridModel } from '../models';
import { Component, ViewChild } from '@angular/core';
import { MessageService } from '../../core/services';

@Component({
  template: `
    <mw-editor-grid [model]="model"></mw-editor-grid>
  `
})
class MockEditorGridComponent {
  model: EditorGridModel = new EditorGridModel();
  @ViewChild(MwEditorGridComponent) editorGridComponent: MwEditorGridComponent;
}

describe('MwEditorGridComponent', () => {
  let component: MockEditorGridComponent;
  let fixture: ComponentFixture<MockEditorGridComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwEditorGridComponent, MockEditorGridComponent],
        imports: [
          MwEditorCellModule,
          SelectionTagModule,
          DndModule.forRoot(),
          FlexLayoutModule
        ],
        providers: [FlexLayoutShimService, MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockEditorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default model', () => {
    const el = document.querySelector('.mw-editor-grid') as HTMLElement;
    expect(el).not.toBeNull();
  });

  it('should be selected when clicked', () => {
    const spy = spyOn(
      component.editorGridComponent['messageService'],
      'publish'
    );
    expect(component.editorGridComponent.selected).toBeFalsy();
    const el: HTMLElement = fixture.nativeElement.querySelector(
      '.mw-editor-grid-drag-handle'
    );
    el.click();
    fixture.detectChanges();

    expect(component.editorGridComponent.selected).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: component.model
    });
  });

  it('should be unselected when already selected and clicked', () => {
    component.editorGridComponent.selected = true;
    fixture.detectChanges();
    expect(component.editorGridComponent.selected).toBeTruthy();
    const el = fixture.nativeElement.querySelector(
      '.mw-editor-grid-drag-handle'
    );
    const spy = spyOn(
      component.editorGridComponent['messageService'],
      'publish'
    );
    el.click();
    fixture.detectChanges();

    expect(component.editorGridComponent.selected).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: undefined
    });
  });

  it('should publish a message when a property has changed', () => {
    const spy = spyOn(
      component.editorGridComponent['messageService'],
      'publish'
    );
    component.editorGridComponent['notify']();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.propertyChange
    });
  });

  it('should set model and send a notification when a property changes', () => {
    const spy = spyOn(<any>component.editorGridComponent, 'notify');
    const model = component.model;
    component.editorGridComponent['handlePropertyEditorMessage']({
      command: Command.propertyChange,
      data: model
    });
    expect(component.editorGridComponent.model).toBe(model);
    expect(spy).toHaveBeenCalled();
  });

  it('should enable drag on mouseenter and disable drag on mouseout', () => {
    expect(component.editorGridComponent.dragEnabled).toBeFalsy();
    const el = document.querySelector(
      '.mw-editor-grid-drag-handle'
    ) as HTMLElement;
    el.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(component.editorGridComponent.dragEnabled).toBeTruthy();

    el.dispatchEvent(new MouseEvent('mouseout'));
    fixture.detectChanges();
    expect(component.editorGridComponent.dragEnabled).toBeFalsy();
  });
});
