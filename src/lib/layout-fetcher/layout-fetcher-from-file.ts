import { LayoutFetcher } from './layout-fetcher';
import { HttpClient } from '@angular/common/http';
import { LayoutModel } from '../core/models/layout.model';

export class LayoutFetcherFromFile implements LayoutFetcher {
  constructor(private http: HttpClient) {}

  public fetch(url: string) {
    return this.http.get<LayoutModel>(url).pipe();
  }
}
