import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutViewerComponent } from './layout-viewer.component';
import { MwGridModule } from '../../lib/grid/grid.module';
import { LayoutService } from '../core/services/layout.service';
import { HttpClientModule } from '@angular/common/http';
import { MwTextModule } from '../../lib/text/text.module';

describe('LayoutViewerComponent', () => {
  let component: LayoutViewerComponent;
  let fixture: ComponentFixture<LayoutViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutViewerComponent ],
      imports: [
        MwGridModule,
        HttpClientModule,
        MwTextModule
      ],
      providers: [
        LayoutService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
