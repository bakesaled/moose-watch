import { Injectable } from '@angular/core';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { LayoutService } from '../../../lib/layout/layout.service';
import { LayoutListService, SaveService } from '../services';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';

@Injectable()
export class LayoutPreLoadResolver implements Resolve<any> {
  constructor(
    private layoutListService: LayoutListService,
    private layoutService: LayoutService,
    private saveService: SaveService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.preloadDefaultLayouts();
  }

  preloadDefaultLayouts() {
    return this.layoutListService.loadFromFileSystem().pipe(
      map(list => {
        list.items.forEach(item => {
          this.layoutService
            .loadFromFileSystem(
              new LayoutModel(item.id, item.name),
              './assets/layouts/'
            )
            .subscribe(layout => {
              console.log('got it', localStorage.getItem('layout-list'));
              this.saveService.save(layout);
              return Observable.of(null);
            });
        });
      })
    );
  }
}
