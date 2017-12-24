import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwCellComponent } from './cell.component';
import { FlexLayoutShimService } from '../../core/services';
import { FactoryModule } from '../../factory/factory.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoComponent } from '../../no.component';

describe('MwCellComponent', () => {
  let component: MwCellComponent;
  let fixture: ComponentFixture<MwCellComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwCellComponent, NoComponent],
        imports: [FactoryModule],
        providers: [FlexLayoutShimService]
      }).compileComponents();

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [NoComponent]
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
