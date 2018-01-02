import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwLayoutComponent } from './layout.component';
import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';
import { MwGridComponent } from '../grid/grid.component';
import { MwCellComponent } from '../grid/cell/cell.component';
import { MwFactoryComponent } from '../factory/factory.component';
import { FlexLayoutShimService } from '../core/services/flex-layout-shim.service';
import { ComponentFactoryService } from '../factory/component-factory.service';

describe('MwLayoutComponent', () => {
  let component: MwLayoutComponent;
  let fixture: ComponentFixture<MwLayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        declarations: [
          MwLayoutComponent,
          MwGridComponent,
          MwCellComponent,
          MwFactoryComponent
        ],
        providers: [
          LayoutService,
          FlexLayoutShimService,
          ComponentFactoryService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
