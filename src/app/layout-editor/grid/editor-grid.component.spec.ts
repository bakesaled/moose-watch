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
});
