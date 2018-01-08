import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutViewerComponent } from './layout-viewer.component';
import { LayoutService } from '../../lib/layout/layout.service';
import { HttpClientModule } from '@angular/common/http';
import { MwLayoutModule } from '../../lib/layout/layout.module';
import { MwTextModule } from '../../lib/text/text.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../lib/core/services/local-storage.service';
import { mockLocalStorage } from '../core/mocks/local-storage.mock';
import { LayoutListModel } from '../core/models';
import { LayoutModel } from '../../lib/core/models/layout.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('LayoutViewerComponent', () => {
  let component: LayoutViewerComponent;
  let fixture: ComponentFixture<LayoutViewerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LayoutViewerComponent],
        imports: [
          HttpClientModule,
          MwLayoutModule,
          MwTextModule,
          RouterTestingModule
        ],
        providers: [
          LayoutService,
          LocalStorageService,
          {
            provide: ActivatedRoute,
            useValue: {
              params: Observable.of({ id: 'testId' }),
              queryParams: Observable.of({ name: 'testName' })
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
    const layoutList = new LayoutListModel([layout]);
    localStorage.setItem('layout-list', JSON.stringify(layoutList));
    localStorage.setItem(layout.id, JSON.stringify(layout));
    fixture = TestBed.createComponent(LayoutViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
