import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPickerComponent } from './component-picker.component';
import { MatIconModule, MatListModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';

describe('ComponentPickerComponent', () => {
  let component: ComponentPickerComponent;
  let fixture: ComponentFixture<ComponentPickerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ComponentPickerComponent],
        imports: [MatListModule, DndModule.forRoot(), MatIconModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
