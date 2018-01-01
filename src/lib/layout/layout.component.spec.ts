import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwLayoutComponent } from './layout.component';
import { MwGridComponent } from '../grid';
import { MwCellComponent } from '../grid/cell';
import { ComponentFactoryService, MwFactoryComponent } from '../factory';
import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutShimService } from '../core/services';

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
