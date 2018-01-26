import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditorComponent } from './property-editor.component';
import { MessageService } from '../../core/services';
import {
  MatButtonToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { PropertyEditorMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import { EditorTextModel } from '../models';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        imports: [
          MatIconModule,
          MatButtonToggleModule,
          FormsModule,
          ReactiveFormsModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
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

  it('should change fontStyle when italic button is clicked', () => {
    expect(component.propertyEditorComponent.componentModel.fontStyle).toBe(
      'normal'
    );
    const el = fixture.nativeElement.querySelector(
      '.mw-property-editor-font-style label'
    ) as HTMLElement;
    el.click();
    fixture.detectChanges();

    expect(component.propertyEditorComponent.componentModel.fontStyle).toBe(
      'italic'
    );
  });

  it('should change fontWeight when bold button is clicked', () => {
    expect(component.propertyEditorComponent.componentModel.fontWeight).toBe(
      '400'
    );
    const el = fixture.nativeElement.querySelector(
      '.mw-property-editor-font-weight label'
    ) as HTMLElement;
    el.click();
    fixture.detectChanges();

    expect(component.propertyEditorComponent.componentModel.fontWeight).toBe(
      '900'
    );
  });

  it('should change fontSize', () => {
    expect(component.propertyEditorComponent.componentModel.fontSize).toBe(
      'inherit'
    );
    const el = fixture.nativeElement.querySelector(
      '.mw-property-editor-font-size'
    ) as HTMLInputElement;
    el.value = '12';
    event = new MouseEvent('input');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.propertyEditorComponent.componentModel.fontSize).toBe(
      '12px'
    );
  });
});
