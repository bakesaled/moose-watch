import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutViewerModule } from './layout-viewer/layout-viewer.module';
import { CoreModule } from './core/core.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MainSidenavContainerModule } from './main-sidenav-container/main-sidenav-container.module';
import { LayoutModule } from '@angular/cdk/layout';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule,
          SharedModule,
          CoreModule,
          HttpClientModule,
          LayoutViewerModule,
          ToolbarModule,
          MainSidenavContainerModule,
          LayoutModule
        ]
      }).compileComponents();
    })
  );
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
