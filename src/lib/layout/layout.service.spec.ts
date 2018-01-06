import { TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../core/services/local-storage.service';

describe('LayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LayoutService, LocalStorageService]
    });
  });

  it(
    'should be created',
    inject([LayoutService], (service: LayoutService) => {
      expect(service).toBeTruthy();
    })
  );
});
