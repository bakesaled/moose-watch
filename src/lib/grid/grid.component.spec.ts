import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwGridComponent } from './grid.component';
import { MwCellComponent } from './cell/cell.component';
import { MwFactoryComponent } from '../factory/factory.component';
import { FlexLayoutShimService } from '../core/services/flex-layout-shim.service';
import { ComponentFactoryService } from '../factory/component-factory.service';

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
