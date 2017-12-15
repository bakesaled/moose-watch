import { TestBed, inject } from '@angular/core/testing';
import { LayoutListService } from './layout-list.service';

describe('LayoutListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutListService]
    });
  });

  it('should be created', inject([LayoutListService], (service: LayoutListService) => {
    expect(service).toBeTruthy();
  }));
});
