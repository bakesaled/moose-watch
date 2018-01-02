import { Observable } from 'rxjs/Observable';
import { LayoutModel } from '../core/models/layout.model';

export interface LayoutFetcher {
  fetch(url: string): Observable<LayoutModel>;
}
