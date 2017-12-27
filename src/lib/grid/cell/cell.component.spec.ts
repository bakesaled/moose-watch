import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwCellComponent } from './cell.component';
import { FlexLayoutShimService } from '../../core/services';
import { MwFactoryModule } from '../../factory/factory.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MwNoComponent } from '../../no-component/no.component';

describe('MwCellComponent', () => {
  let component: MwCellComponent;
  let fixture: ComponentFixture<MwCellComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwCellComponent, MwNoComponent],
        imports: [MwFactoryModule],
        providers: [FlexLayoutShimService]
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
