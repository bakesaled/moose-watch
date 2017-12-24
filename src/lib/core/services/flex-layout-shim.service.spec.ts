import { TestBed, inject } from '@angular/core/testing';

import { FlexLayoutShimService } from './flex-layout-shim.service';

describe('FlexLayoutShimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlexLayoutShimService]
    });
  });

  it(
    'should be created',
    inject([FlexLayoutShimService], (service: FlexLayoutShimService) => {
      expect(service).toBeTruthy();
    })
  );
});
