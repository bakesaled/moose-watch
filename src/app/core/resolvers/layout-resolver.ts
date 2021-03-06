import { Injectable } from '@angular/core';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LayoutService } from '../../../lib/layout/layout.service';
import { Constants } from '../constants';
import { of } from 'rxjs';

@Injectable()
export class LayoutResolver implements Resolve<LayoutModel> {
  constructor(private layoutService: LayoutService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LayoutModel> {
    return this.loadLayout(route);
  }

  loadLayout(route: ActivatedRouteSnapshot): Observable<LayoutModel> {
    const isNew = route.queryParamMap.get('new') === 'true';
    const id = route.paramMap.get('id');
    console.log('params', isNew, id);
    if (isNew) {
      return of(new LayoutModel(id, Constants.newLayoutBaseName));
    } else {
      const layout = new LayoutModel(id, route.queryParamMap.get('name'));
      const result = this.layoutService.loadFromStorage(layout);
      if (result) {
        return of(result);
      } else {
        this.router.navigate(['/landing']);
        return of(null);
      }
    }
  }
}
