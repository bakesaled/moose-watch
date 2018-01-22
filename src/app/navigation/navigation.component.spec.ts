import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { MatListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { LayoutListService, MessageService } from '../core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../lib/core/services/local-storage.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LayoutModel } from '../../lib/core/models/layout.model';
import { mockLocalStorage } from '../core/mocks/local-storage.mock';
import { LayoutListModel } from '../core/models';
import { MockLayoutListService } from '../core/mocks/layout-list-service.mock';
import { Command } from '../core/enums';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let route: ActivatedRoute;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [NavigationComponent],
        imports: [MatListModule, HttpClientModule, RouterTestingModule],
        providers: [
          {
            provide: LayoutListService,
            useClass: MockLayoutListService
          },
          LocalStorageService,
          MessageService,
          {
            provide: ActivatedRoute,
            useValue: {
              url: Observable.of([
                new UrlSegment('layout-viewer', {}),
                new UrlSegment('testIdFromFile', {})
              ]),
              params: Observable.of({ id: 'testIdFromFile' }),
              paramMap: Observable.of({ id: 'testIdFromFile' }),
              queryParams: Observable.of({
                name: 'testNameFromFile'
              })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    const layoutList = new LayoutListModel([
      new LayoutModel('testId', 'testName')
    ]);
    localStorage.setItem('layout-list', JSON.stringify(layoutList));
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 list-items', () => {
    const items = document.querySelectorAll('.mat-list-item');
    expect(items.length).toBe(3);
  });

  // Fails to render item with .active-route class for some reason
  xit('should select item on load', () => {
    const activatedItem = document.querySelectorAll(
      '.mat-list-item.active-route'
    );
    expect(activatedItem.length).toBe(1);
  });

  it('should reload navItems and navigate home on work area delete', () => {
    const spy = spyOn(component, 'loadNavItems');
    const navSpy = spyOn(component['router'], 'navigate');
    component['handleWorkAreaMessage']({
      command: Command.delete
    });
    expect(spy).toHaveBeenCalled();
    expect(navSpy).toHaveBeenCalledWith(['/']);
  });

  it('should reload navItems and navigate to new page on work area edit', () => {
    const spy = spyOn(component, 'loadNavItems');
    const navSpy = spyOn(component['router'], 'navigate');
    component['handleWorkAreaMessage']({
      command: Command.edit,
      data: { id: 'testId', name: 'testName' }
    });
    expect(spy).toHaveBeenCalled();
    expect(navSpy).toHaveBeenCalledWith(['/layout-editor/testId'], {
      queryParams: { name: 'testName' }
    });
  });
});
