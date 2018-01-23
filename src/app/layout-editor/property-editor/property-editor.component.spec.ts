import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditorComponent } from './property-editor.component';
import { MessageService } from '../../core/services';
import { MatButtonToggleModule, MatIconModule } from '@angular/material';
import { PropertyEditorMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { EditorTextModel } from '../models';
import { Component, ViewChild } from '@angular/core';

@Component({
  template: `
    <mw-property-editor [componentModel]="model"></mw-property-editor>
  `
})
class MockPropertyEditorComponent {
  model: EditorTextModel;
  @ViewChild(PropertyEditorComponent)
  propertyEditorComponent: PropertyEditorComponent;
}

describe('PropertyEditorComponent', () => {
  let component: MockPropertyEditorComponent;
  let fixture: ComponentFixture<MockPropertyEditorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PropertyEditorComponent, MockPropertyEditorComponent],
        imports: [MatIconModule, MatButtonToggleModule],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPropertyEditorComponent);
    component = fixture.componentInstance;
    component.model = new EditorTextModel();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default model', () => {
    const el = document.querySelector('.mw-property-editor') as HTMLElement;
    expect(el).not.toBeNull();
  });

  it('should publish a message when a property has changed', () => {
    const spy = spyOn(
      component.propertyEditorComponent['messageService'],
      'publish'
    );
    component.propertyEditorComponent['notify']();
    expect(spy).toHaveBeenCalledWith(PropertyEditorMessage, {
      command: Command.propertyChange,
      data: component.propertyEditorComponent.componentModel
    });
  });

  it('should change fontStyle when italic button clicked', () => {
    expect(component.propertyEditorComponent.componentModel.fontStyle).toBe(
      'normal'
    );
    const el = fixture.nativeElement.querySelector(
      '.mw-property-editor-italic label'
    ) as HTMLElement;
    el.click();
    fixture.detectChanges();

    expect(component.propertyEditorComponent.componentModel.fontStyle).toBe(
      'italic'
    );
  });
});
