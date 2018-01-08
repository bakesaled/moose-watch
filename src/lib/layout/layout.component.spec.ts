import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwLayoutComponent } from './layout.component';
import { LayoutService } from './layout.service';
import { HttpClientModule } from '@angular/common/http';
import { MwGridComponent } from '../grid/grid.component';
import { MwCellComponent } from '../grid/cell/cell.component';
import { MwFactoryComponent } from '../factory/factory.component';
import { FlexLayoutShimService } from '../core/services/flex-layout-shim.service';
import { ComponentFactoryService } from '../factory/component-factory.service';
import { LayoutModel } from '../core/models/layout.model';
import { mockLocalStorage } from '../../app/core/mocks/local-storage.mock';
import { LocalStorageService } from '../core/services/local-storage.service';

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
          ComponentFactoryService,
          LocalStorageService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    const layout = new LayoutModel('testId', 'testName');
    localStorage.setItem(layout.id, JSON.stringify(layout));
    fixture = TestBed.createComponent(MwLayoutComponent);
    component = fixture.componentInstance;
    component.layout = layout;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
