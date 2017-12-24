import { TestBed, inject } from '@angular/core/testing';
import { LayoutListService } from './layout-list.service';
import { HttpClientModule } from '@angular/common/http';

describe('LayoutListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LayoutListService]
    });
  });

  it(
    'should be created',
    inject([LayoutListService], (service: LayoutListService) => {
      expect(service).toBeTruthy();
    })
  );
});
