import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidenavContainerComponent } from './main-sidenav-container.component';
import { MatSidenavModule } from '@angular/material';
import { Command } from '../core/enums';
import { NavigationModule } from '../navigation/navigation.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutListService, MessageService } from '../core/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockLayoutListService } from '../core/mocks/layout-list-service.mock';
import { LayoutModule } from '@angular/cdk/layout';

describe('MainSidenavContainerComponent', () => {
  let component: MainSidenavContainerComponent;
  let fixture: ComponentFixture<MainSidenavContainerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MainSidenavContainerComponent],
        imports: [
          MatSidenavModule,
          NavigationModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          LayoutModule
        ],
        providers: [
          {
            provide: LayoutListService,
            useClass: MockLayoutListService
          },
          MessageService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidenavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle opened state of sidenav when toolbar button is toggled', () => {
    expect(component.opened).toBeTruthy();
    component['handleToolbarMessage']({
      command: Command.navToggle
    });
    expect(component.opened).toBeFalsy();
  });
});
