import { inject, TestBed } from '@angular/core/testing';
import { DndInterModuleCommService } from './dnd-inter-module-comm.service';

describe('DndInterModuleCommService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DndInterModuleCommService]
    });
  });

  it(
    'should be created',
    inject([DndInterModuleCommService], (service: DndInterModuleCommService) => {
      expect(service).toBeTruthy();
    })
  );
});
