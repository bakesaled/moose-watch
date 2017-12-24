import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwLayoutEditorComponent } from './layout-editor.component';
import { MatSidenavModule } from '@angular/material';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  LocalStorageService,
  MessageService,
  SaveService
} from '../core/services';
import { MwGridModule } from '../grid/grid.module';
import { MwTextModule } from '../text/text.module';

describe('MwLayoutEditorComponent', () => {
  let component: MwLayoutEditorComponent;
  let fixture: ComponentFixture<MwLayoutEditorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwLayoutEditorComponent],
        imports: [
          BrowserAnimationsModule,
          MatSidenavModule,
          MwWorkAreaModule,
          MwToolPanelModule,
          MwGridModule,
          MwTextModule
        ],
        providers: [MessageService, SaveService, LocalStorageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwLayoutEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
