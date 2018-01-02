import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwCellComponent } from './cell.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MwNoComponent } from '../../no-component/no.component';
import { MwFactoryComponent } from '../../factory/factory.component';
import { FlexLayoutShimService } from '../../core/services/flex-layout-shim.service';
import { ComponentFactoryService } from '../../factory/component-factory.service';

describe('MwCellComponent', () => {
  let component: MwCellComponent;
  let fixture: ComponentFixture<MwCellComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwCellComponent, MwNoComponent, MwFactoryComponent],
        imports: [],
        providers: [FlexLayoutShimService, ComponentFactoryService]
      }).compileComponents();

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [MwNoComponent]
        }
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MwCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
