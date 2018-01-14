import { TestBed, inject } from '@angular/core/testing';
import { LayoutListService } from './layout-list.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LayoutListItemModel, LayoutListModel } from '../models';
import { Constants } from '../constants';
import { mockLocalStorage } from '../mocks/local-storage.mock';

describe('LayoutListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [LayoutListService, LocalStorageService]
    });
  });

  beforeEach(() => {
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
    inject([LayoutListService], (service: LayoutListService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should get list from file system',
    inject(
      [LayoutListService, HttpTestingController],
      (service: LayoutListService, backend: HttpTestingController) => {
        const mockList: LayoutListModel = {
          items: [
            {
              name: 'test1',
              id: 'test1Id'
            }
          ]
        };
        service.loadFromFileSystem().subscribe(list => {
          expect(list.items.length).toBe(1);
        });

        backend
          .expectOne('./assets/layouts/layout-list.json')
          .flush(mockList, { status: 200, statusText: 'Ok' });
      }
    )
  );

  it(
    'should get list from local storage',
    inject([LayoutListService], (service: LayoutListService) => {
      const mockList: LayoutListModel = {
        items: [
          {
            name: 'test1',
            id: 'test1Id'
          }
        ]
      };
      localStorage.setItem(Constants.layoutListId, JSON.stringify(mockList));
      const list = service.loadFromStorage();
      expect(list).toEqual(mockList);
    })
  );

  it(
    'should get next unique name',
    inject([LayoutListService], (service: LayoutListService) => {
      const mockList: LayoutListModel = {
        items: [
          {
            name: 'new-layout-0',
            id: 'test1Id'
          }
        ]
      };
      const name = service['getNextUniqueName'](mockList);
      expect(name).toEqual('new-layout-1');
    })
  );

  it(
    'should get next unique name when list is empty',
    inject([LayoutListService], (service: LayoutListService) => {
      const name = service['getNextUniqueName'](new LayoutListModel([]));
      expect(name).toEqual('new-layout-0');
    })
  );

  it(
    'should get next unique name when list does not contain an existing new-layout',
    inject([LayoutListService], (service: LayoutListService) => {
      const mockList: LayoutListModel = {
        items: [
          {
            name: 'my-favorite-layout',
            id: 'test1Id'
          }
        ]
      };
      const name = service['getNextUniqueName'](mockList);
      expect(name).toEqual('new-layout-0');
    })
  );

  it(
    'should delete list item',
    inject([LayoutListService], (service: LayoutListService) => {
      const mockList: LayoutListModel = {
        items: [
          {
            name: 'test1',
            id: 'test1Id'
          }
        ]
      };
      localStorage.setItem(Constants.layoutListId, JSON.stringify(mockList));
      service.deleteItem('test1Id');

      const list = JSON.parse(localStorage.getItem(Constants.layoutListId));
      expect(list.items.length).toBe(0);
    })
  );

  it(
    'should save list item',
    inject([LayoutListService], (service: LayoutListService) => {
      const mockListItem: LayoutListItemModel = {
        name: 'test1',
        id: 'test1Id'
      };
      service.saveItem(mockListItem);

      const list = JSON.parse(localStorage.getItem(Constants.layoutListId));
      expect(list.items[0]).toEqual(mockListItem);
    })
  );
});
