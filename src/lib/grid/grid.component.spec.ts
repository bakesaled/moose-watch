import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwGridComponent } from './grid.component';
import { MwCellModule } from './cell/cell.module';
import { FlexLayoutShimService } from '../core/services';
import { MwTextModule } from '../text/text.module';

describe('MwGridComponent', () => {
  let component: MwGridComponent;
  let fixture: ComponentFixture<MwGridComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwGridComponent],
        imports: [MwCellModule, MwTextModule],
        providers: [FlexLayoutShimService]
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
