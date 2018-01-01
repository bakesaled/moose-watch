import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwCellComponent } from './cell.component';
import { FlexLayoutShimService } from '../../core/services';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ComponentFactoryService, MwFactoryComponent } from '../../factory';
import { MwNoComponent } from '../../no-component';

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
