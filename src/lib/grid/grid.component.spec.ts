import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwGridComponent } from './grid.component';
import { FlexLayoutShimService } from '../core/services';
import { MwCellComponent } from './cell';
import { ComponentFactoryService, MwFactoryComponent } from '../factory';

describe('MwGridComponent', () => {
  let component: MwGridComponent;
  let fixture: ComponentFixture<MwGridComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwGridComponent, MwCellComponent, MwFactoryComponent],
        imports: [],
        providers: [FlexLayoutShimService, ComponentFactoryService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
