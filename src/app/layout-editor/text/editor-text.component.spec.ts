import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorTextComponent } from './editor-text.component';
import { DndModule } from 'ng2-dnd';
import { SelectionTagModule } from '../selection-tag/selection-tag.module';
import { MessageService } from '../../core/services';
import { EditorComponentMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { Component, ViewChild } from '@angular/core';
import { EditorTextModel } from '../models';

@Component({
  template: `
    <mw-editor-text [model]="model"></mw-editor-text>
  `
})
class MockEditorTextComponent {
  model: EditorTextModel;
  @ViewChild(MwEditorTextComponent) editorTextComponent: MwEditorTextComponent;
}

describe('MwEditorTextComponent', () => {
  let component: MockEditorTextComponent;
  let fixture: ComponentFixture<MockEditorTextComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DndModule.forRoot(), SelectionTagModule],
        declarations: [MwEditorTextComponent, MockEditorTextComponent],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockEditorTextComponent);
    component = fixture.componentInstance;
    component.model = new EditorTextModel();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default model', () => {
    const el = document.querySelector('.mw-editor-text') as HTMLElement;
    expect(el).not.toBeNull();
  });

  it('should be selected when clicked', () => {
    const spy = spyOn(
      component.editorTextComponent['messageService'],
      'publish'
    );
    expect(component.editorTextComponent.selected).toBeFalsy();
    const el = fixture.nativeElement.querySelector(
      '.mw-editor-text-drag-handle'
    );
    event = new MouseEvent('click');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.editorTextComponent.selected).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: component.model
    });
  });

  it('should be unselected when already selected and clicked', () => {
    component.editorTextComponent.selected = true;
    fixture.detectChanges();
    expect(component.editorTextComponent.selected).toBeTruthy();
    const el = fixture.nativeElement.querySelector(
      '.mw-editor-text-drag-handle'
    );
    const spy = spyOn(
      component.editorTextComponent['messageService'],
      'publish'
    );
    event = new MouseEvent('click');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.editorTextComponent.selected).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: undefined
    });
  });

  it('should publish a message when a property has changed', () => {
    const spy = spyOn(
      component.editorTextComponent['messageService'],
      'publish'
    );
    component.editorTextComponent['notify']();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.propertyChange
    });
  });
});
