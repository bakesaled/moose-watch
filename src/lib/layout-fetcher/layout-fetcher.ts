import { Observable } from 'rxjs/Observable';
import { LayoutModel } from '../core/models';

export interface LayoutFetcher {
  fetch(url: string): Observable<LayoutModel>;
}
