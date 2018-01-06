import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { mockLocalStorage } from '../mocks/local-storage.mock';

describe('LocalStorageService', () => {
  // let mockLocalStorage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    // mockLocalStorage = new MockLocalStorage();
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it(
    'should be created',
    inject([LocalStorageService], (service: LocalStorageService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should be able to set item',
    inject([LocalStorageService], (service: LocalStorageService) => {
      service.setItem('testKey', 'testValue');

      expect(service.getItem('testKey')).toBe('testValue');
    })
  );

  it(
    'should be able to remove item',
    inject([LocalStorageService], (service: LocalStorageService) => {
      service.setItem('testKey', 'testValue');

      expect(service.getItem('testKey')).toBe('testValue');
      service.removeItem('testKey');
      expect(service.getItem('testKey')).toBeUndefined();
    })
  );
});
