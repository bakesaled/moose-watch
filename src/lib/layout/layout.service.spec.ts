import { TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutRetrievalStrategy } from './layout-retrieval-strategy';

describe('LayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LayoutService]
    });
  });

  it(
    'should be created',
    inject([LayoutService], (service: LayoutService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should throw error if layout name is null or empty',
    inject([LayoutService], (service: LayoutService) => {
      expect(function() {
        service.get(LayoutRetrievalStrategy.fileSystem, null);
      }).toThrowError('Layout Name is required.');

      expect(function() {
        service.get(LayoutRetrievalStrategy.fileSystem, '');
      }).toThrowError('Layout Name is required.');
    })
  );
});
