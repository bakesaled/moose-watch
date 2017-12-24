import { TestBed, inject } from '@angular/core/testing';

import { SaveService } from './save.service';
import { LocalStorageService } from './local-storage.service';

describe('SaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveService, LocalStorageService]
    });
  });

  it('should be created', inject([SaveService], (service: SaveService) => {
    expect(service).toBeTruthy();
  }));
});
