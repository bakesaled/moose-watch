import { TestBed, inject } from '@angular/core/testing';

import { SaveService } from './save.service';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { mockLocalStorage } from '../mocks/local-storage.mock';
import { LayoutListItemModel, LayoutListModel } from '../models';
import { LayoutListService } from './layout-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SaveService, LocalStorageService, LayoutListService]
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
      const layoutSpy = spyOn(service['localStorageService'], 'setItem');
      const listSpy = spyOn(service['layoutListService'], 'saveItem');
      const mockLayout = new LayoutModel('testId', 'testName');
      const mockLayoutList = new LayoutListModel();
      mockLayoutList.items.push(
        new LayoutListItemModel(mockLayout.id, mockLayout.name)
      );

      service.save(mockLayout);
      expect(layoutSpy).toHaveBeenCalledWith(
        mockLayout.id,
        JSON.stringify(mockLayout)
      );
      expect(listSpy).toHaveBeenCalledWith(
        new LayoutListItemModel(mockLayout.id, mockLayout.name)
      );
    })
  );

  it(
    'should delete layout and list',
    inject([SaveService], (service: SaveService) => {
      const layoutSpy = spyOn(service['localStorageService'], 'removeItem');
      const listSpy = spyOn(service['layoutListService'], 'deleteItem');
      const mockLayout = new LayoutModel('testId', 'testName');

      service.delete(mockLayout.id);
      expect(layoutSpy).toHaveBeenCalledWith(mockLayout.id);
      expect(listSpy).toHaveBeenCalledWith(mockLayout.id);
    })
  );
});
