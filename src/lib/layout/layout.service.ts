import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LayoutRetrievalStrategy } from './layout-retrieval-strategy';
import { LayoutModel } from '../core/models/layout.model';
import 'rxjs/add/observable/of';
import { LocalStorageService } from '../core/services/local-storage.service';

@Injectable()
export class LayoutService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  get(layout: LayoutModel, baseUrl: string = ''): Observable<LayoutModel> {
    switch (layout.retrievalStrategy) {
      case LayoutRetrievalStrategy.localStorage:
        const layoutString = this.localStorageService.getItem(layout.id);
        console.log('ppppp', layout);
        if (layoutString) {
          return Observable.of(JSON.parse(layoutString));
        } else {
          return Observable.of(undefined);
        }
      case LayoutRetrievalStrategy.fileSystem:
        return this.http.get<LayoutModel>(baseUrl + layout.name + '.json');
      default:
        throw new Error(
          `LayoutRetrievalStrategy '${
            layout.retrievalStrategy
          } not implemented.`
        );
    }
  }
}
