import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorTextComponent } from './editor-text.component';
import { DndModule } from 'ng2-dnd';
import { SelectionTagModule } from '../../shared/selection-tag/selection-tag.module';

describe('MwEditorTextComponent', () => {
  let component: MwEditorTextComponent;
  let fixture: ComponentFixture<MwEditorTextComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DndModule.forRoot(), SelectionTagModule],
        declarations: [MwEditorTextComponent]
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
    expect(component.selected).toBeFalsy();
    const el = fixture.nativeElement.querySelector(
      '.mw-editor-text-drag-handle'
    );
    event = new MouseEvent('click');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.selected).toBeTruthy();

    event = new MouseEvent('click');
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.selected).toBeFalsy();
  });
});
