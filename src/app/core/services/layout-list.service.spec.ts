import { TestBed, inject } from '@angular/core/testing';
import { LayoutListService } from './layout-list.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LayoutListModel } from '../models';
import { LayoutRetrievalStrategy } from '../../../lib/layout/layout-retrieval-strategy';

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
              id: 'test1Id',
              retrievalStrategy: LayoutRetrievalStrategy.localStorage
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
            id: 'test1Id',
            retrievalStrategy: LayoutRetrievalStrategy.localStorage
          }
        ]
      };
      localStorage.setItem('layout-list', JSON.stringify(mockList));
      const list = service.loadFromStorage();
      expect(list).toEqual(mockList);
    })
  );
});
