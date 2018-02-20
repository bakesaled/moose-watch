import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditorComponent } from './property-editor.component';
import { MessageService } from '../../core/services';
import {
  MatButtonToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { PropertyEditorMessage } from '../../core/messages';
import { Command } from '../../core/enums';
import {
  EditorCellModel,
  EditorGridModel,
  EditorLayoutModel,
  EditorTextModel
} from '../models';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockEditorComponentModel } from '../../core/mocks/editor-component-model.mock';

@Component({
  template: `
    <mw-property-editor [componentModel]="model"></mw-property-editor>
  `
})
class MockPropertyEditorComponent {
  model: EditorTextModel | EditorGridModel | EditorLayoutModel;
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
          BrowserAnimationsModule,
          MatListModule
        ],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  describe('layout component', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MockPropertyEditorComponent);
      component = fixture.componentInstance;
      component.model = new EditorLayoutModel();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should change name', () => {
      expect(component.propertyEditorComponent.componentModel.name).toBe(
        'NO_NAME'
      );
      const el = fixture.nativeElement.querySelector(
        '.mw-property-editor-name'
      ) as HTMLInputElement;
      el.value = 'apple';
      event = new MouseEvent('input');
      el.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.propertyEditorComponent.componentModel.name).toBe(
        'apple'
      );
    });
  });

  describe('text component', () => {
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

    it('should change color', () => {
      expect(component.propertyEditorComponent.componentModel.color).toBe(
        'inherit'
      );
      const el = fixture.nativeElement.querySelector(
        '.mw-property-editor-color'
      ) as HTMLInputElement;
      el.value = 'red';
      event = new MouseEvent('input');
      el.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.propertyEditorComponent.componentModel.color).toBe(
        'red'
      );
    });
  });

  describe('grid component', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MockPropertyEditorComponent);
      component = fixture.componentInstance;
      component.model = new EditorGridModel('123', [
        new EditorCellModel(),
        new EditorCellModel()
      ]);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should change cell count', () => {
      expect(
        component.propertyEditorComponent.componentModel.cells.length
      ).toBe(2);
      const el = fixture.nativeElement.querySelector(
        '.mw-property-editor-cell-count'
      ) as HTMLInputElement;
      el.value = '3';
      event = new MouseEvent('input');
      el.dispatchEvent(event);
      fixture.detectChanges();

      expect(
        component.propertyEditorComponent.componentModel.cells.length
      ).toBe(3);
    });

    it('should be invalid cell count if cells are full and new count < current count', () => {
      component.propertyEditorComponent.componentModel.cells[0].component = new MockEditorComponentModel();
      component.propertyEditorComponent.componentModel.cells[1].component = new MockEditorComponentModel();
      component.propertyEditorComponent.cellCountFormControl.patchValue(1);
      const result = component.propertyEditorComponent.cellsAreFullValidator(
        component.propertyEditorComponent.cellCountFormControl
      );
      expect(result).not.toBeNull();
      expect(result.cellsAreFull.valid).toBeFalsy();
    });

    it('should be valid cell count if cells are full, but new count >= current count', () => {
      component.propertyEditorComponent.componentModel.cells[0].component = new MockEditorComponentModel();
      component.propertyEditorComponent.componentModel.cells[1].component = new MockEditorComponentModel();
      const result = component.propertyEditorComponent.cellsAreFullValidator(
        component.propertyEditorComponent.cellCountFormControl
      );
      expect(result).toBeNull();
    });
  });
});
