import { TestBed, inject } from '@angular/core/testing';
import { LayoutListService } from './layout-list.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LayoutListModel } from '../models';

describe('LayoutListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [LayoutListService, LocalStorageService]
    });
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
          .expectOne('./assets/layouts/layouts-list.json')
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
      localStorage.setItem('layout-list', JSON.stringify(mockList));
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
      const name = service.getNextUniqueName(mockList);
      expect(name).toEqual('new-layout-1');
    })
  );

  it(
    'should get next unique name when list is empty',
    inject([LayoutListService], (service: LayoutListService) => {
      const name = service.getNextUniqueName(new LayoutListModel([]));
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
      const name = service.getNextUniqueName(mockList);
      expect(name).toEqual('new-layout-0');
    })
  );
});
