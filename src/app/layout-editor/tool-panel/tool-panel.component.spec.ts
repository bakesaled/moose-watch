import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwToolPanelComponent } from './tool-panel.component';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import { MessageService } from '../../core/services';
import { DndModule } from 'ng2-dnd';

describe('MwToolPanelComponent', () => {
  let component: MwToolPanelComponent;
  let fixture: ComponentFixture<MwToolPanelComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwToolPanelComponent],
        imports: [
          MatIconModule,
          MatSidenavModule,
          MatListModule,
          DndModule.forRoot()
        ],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwToolPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
