import { TestBed, inject } from '@angular/core/testing';

import { SaveService } from './save.service';
import { LocalStorageService } from './local-storage.service';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { mockLocalStorage } from '../mocks/local-storage.mock';
import { LayoutListItemModel, LayoutListModel } from '../models';

describe('SaveService', () => {
  // const mockLocalStorage = new MockLocalStorage();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveService, LocalStorageService]
    });

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it(
    'should be created',
    inject([SaveService], (service: SaveService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should save layout to storage and add item to lookup list',
    inject([SaveService], (service: SaveService) => {
      const mockLayout = new LayoutModel('testId', 'testName');
      const mockLayoutList = new LayoutListModel();
      mockLayoutList.items.push(
        new LayoutListItemModel(mockLayout.id, mockLayout.name)
      );

      service.save(mockLayout);
      expect(mockLocalStorage.getItem('testId')).toBe(
        JSON.stringify(mockLayout)
      );
      expect(mockLocalStorage.getItem('layout-list')).toBe(
        JSON.stringify(mockLayoutList)
      );
    })
  );
});
