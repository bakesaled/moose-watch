import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEditorTextComponent } from './editor-text.component';
import { DndModule } from 'ng2-dnd';

describe('MwEditorTextComponent', () => {
  let component: MwEditorTextComponent;
  let fixture: ComponentFixture<MwEditorTextComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DndModule.forRoot()],
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
