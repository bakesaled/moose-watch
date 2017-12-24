import { TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';

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
});
