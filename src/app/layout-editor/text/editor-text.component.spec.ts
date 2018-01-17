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
});
