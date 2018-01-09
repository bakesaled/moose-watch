import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEditorComponent } from './layout-editor.component';
import { MatSidenavModule } from '@angular/material';
import { MwWorkAreaModule } from './work-area/work-area.module';
import { MwToolPanelModule } from './tool-panel/tool-panel.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, SaveService } from '../core/services';
import { MwTextModule } from '../../lib/text/text.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../lib/core/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LayoutModel } from '../../lib/core/models/layout.model';
import { mockLocalStorage } from '../core/mocks/local-storage.mock';

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
          MwTextModule,
          RouterTestingModule
        ],
        providers: [
          MessageService,
          SaveService,
          LocalStorageService,
          {
            provide: ActivatedRoute,
            useValue: {
              data: Observable.of({
                layout: new LayoutModel('testId', 'testName')
              })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    const layout = new LayoutModel('testId', 'testName');
    localStorage.setItem(layout.id, JSON.stringify(layout));
    fixture = TestBed.createComponent(LayoutEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
