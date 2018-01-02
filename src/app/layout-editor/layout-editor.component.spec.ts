import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEditorComponent } from './layout-editor.component';
import { MatSidenavModule } from '@angular/material';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  LocalStorageService,
  MessageService,
  SaveService
} from '../core/services';
import { MwTextModule } from '../../lib/text/text.module';

describe('LayoutEditorComponent', () => {
  let component: LayoutEditorComponent;
  let fixture: ComponentFixture<LayoutEditorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LayoutEditorComponent],
        imports: [
          BrowserAnimationsModule,
          MatSidenavModule,
          MwWorkAreaModule,
          MwToolPanelModule,
          MwTextModule
        ],
        providers: [MessageService, SaveService, LocalStorageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
