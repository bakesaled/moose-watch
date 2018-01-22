import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorTextComponent } from './editor-text.component';
import { DndModule } from 'ng2-dnd';
import { SelectionTagModule } from '../selection-tag/selection-tag.module';
import { MessageService } from '../../core/services';
import { EditorComponentMessage } from '../../core/messages';
import { Command } from '../../core/enums';

describe('MwEditorTextComponent', () => {
  let component: MwEditorTextComponent;
  let fixture: ComponentFixture<MwEditorTextComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DndModule.forRoot(), SelectionTagModule],
        declarations: [MwEditorTextComponent],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwEditorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be selected when clicked', () => {
    const spy = spyOn(component['messageService'], 'publish');
    expect(component.selected).toBeFalsy();
    const el = fixture.nativeElement.querySelector(
      '.mw-editor-text-drag-handle'
    );
    event = new MouseEvent('click');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.selected).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: component.model
    });
  });

  it('should be unselected when already selected and clicked', () => {
    component.selected = true;
    fixture.detectChanges();
    expect(component.selected).toBeTruthy();
    const el = fixture.nativeElement.querySelector(
      '.mw-editor-text-drag-handle'
    );
    const spy = spyOn(component['messageService'], 'publish');
    event = new MouseEvent('click');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.selected).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: undefined
    });
  });
});
