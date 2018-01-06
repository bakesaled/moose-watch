import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwWorkAreaComponent } from './work-area.component';
import { DndModule } from 'ng2-dnd';
import {
  LocalStorageService,
  MessageService,
  SaveService
} from '../../core/services';
import { RouterTestingModule } from '@angular/router/testing';

describe('MwWorkAreaComponent', () => {
  let component: MwWorkAreaComponent;
  let fixture: ComponentFixture<MwWorkAreaComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwWorkAreaComponent],
        imports: [DndModule.forRoot(), RouterTestingModule],
        providers: [MessageService, SaveService, LocalStorageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwWorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
