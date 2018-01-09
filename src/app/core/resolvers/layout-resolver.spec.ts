import { TestBed, inject } from '@angular/core/testing';

import { LayoutResolver } from './layout-resolver';
import { LayoutListModel } from '../models';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { mockLocalStorage } from '../mocks/local-storage.mock';
import { LayoutService } from '../../../lib/layout/layout.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutResolver', () => {
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        LayoutResolver,
        LayoutService,
        LocalStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.of({
              layout: new LayoutModel('testId', 'testName')
            })
          }
        },
        {
          provide: ActivatedRouteSnapshot,
          useValue: {
            paramMap: {
              id: 'testId',
              get: item => {
                return 'testId';
              }
            },
            queryParamMap: {
              name: 'testName',
              new: 'true',
              get: item => {
                if (item === 'name') {
                  return 'testName';
                }
                return 'true';
              }
            }
          }
        }
      ]
    });
  });

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    route = TestBed.get(ActivatedRouteSnapshot);
    const layout = new LayoutModel('testId', 'testName');
    const layoutList = new LayoutListModel([layout]);
    localStorage.setItem('layout-list', JSON.stringify(layoutList));
    localStorage.setItem(layout.id, JSON.stringify(layout));
  });

  it(
    'should be created',
    inject([LayoutResolver], (service: LayoutResolver) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should get new layout',
    inject([LayoutResolver], (service: LayoutResolver) => {
      service.loadLayout(route).subscribe(layout => {
        expect(layout.id).toBe('testId');
        expect(layout.name).toBe('new-layout');
      });
    })
  );

  it(
    'should get new layout',
    inject([LayoutResolver], (service: LayoutResolver) => {
      route.queryParamMap['new'] = '';
      route.queryParamMap['get'] = item => {
        if (item === 'name') {
          return 'testName';
        }
        return '';
      };
      console.log('route', route);
      service.loadLayout(route).subscribe(layout => {
        expect(layout.id).toBe('testId');
        expect(layout.name).toBe('testName');
      });
    })
  );
});
