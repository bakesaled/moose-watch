import { TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../core/services/local-storage.service';
import { LayoutModel } from '../core/models/layout.model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { mockLocalStorage } from '../../app/core/mocks/local-storage.mock';

describe('LayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [LayoutService, LocalStorageService]
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
    inject([LayoutService], (service: LayoutService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should get list from local storage',
    inject([LayoutService], (service: LayoutService) => {
      const layout = new LayoutModel('testId', 'testName');
      localStorage.setItem(layout.id, JSON.stringify(layout));
      const result = service.loadFromStorage(layout);
      expect(result.id).toBe(layout.id);
    })
  );

  it(
    'can load layout from file system',
    inject(
      [LayoutService, HttpTestingController],
      (service: LayoutService, backend: HttpTestingController) => {
        const layout = new LayoutModel('testId', 'testName');
        service
          .loadFromFileSystem(layout, './assets/layouts/')
          .subscribe(result => {
            expect(result.name).toBe('testName');
          });

        backend
          .expectOne('./assets/layouts/testName.json')
          .flush(layout, { status: 200, statusText: 'Ok' });
      }
    )
  );
});
