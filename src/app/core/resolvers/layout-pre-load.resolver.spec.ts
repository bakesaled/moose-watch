import { TestBed, inject } from '@angular/core/testing';

import { LayoutPreLoadResolver } from './layout-pre-load.resolver';
import { LayoutListModel } from '../models';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { mockLocalStorage } from '../mocks/local-storage.mock';
import { LayoutListService, SaveService } from '../services';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import { LayoutService } from '../../../lib/layout/layout.service';
import { MockLayoutListService } from '../mocks/layout-list-service.mock';
import { MockLayoutService } from '../mocks/layout-service.mock';

describe('LayoutPreLoadResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LayoutPreLoadResolver,
        {
          provide: LayoutListService,
          useClass: MockLayoutListService
        },
        LocalStorageService,
        {
          provide: LayoutService,
          useClass: MockLayoutService
        },
        SaveService
      ]
    });
  });

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it(
    'should be created',
    inject([LayoutPreLoadResolver], (service: LayoutPreLoadResolver) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should load default layouts into storage',
    inject([LayoutPreLoadResolver], (service: LayoutPreLoadResolver) => {
      service.preloadDefaultLayouts().subscribe(() => {
        const list = JSON.parse(
          localStorage.getItem('layout-list')
        ) as LayoutListModel;
        expect(list.items.length).toBe(1);

        let layout: LayoutModel;
        const listItem = list.items[0];
        layout = JSON.parse(localStorage.getItem(listItem.id)) as LayoutModel;
        expect(layout.id).toBe('testIdFromFile');
      });
    })
  );
});
