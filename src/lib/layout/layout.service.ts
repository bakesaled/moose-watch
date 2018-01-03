import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LayoutRetrievalStrategy } from './layout-retrieval-strategy';
import { LayoutModel } from '../core/models/layout.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class LayoutService {
  constructor(private http: HttpClient) {}

  get(
    strategy: LayoutRetrievalStrategy,
    layoutName: string
  ): Observable<LayoutModel> {
    if (isNullOrUndefined(layoutName) || !layoutName.length) {
      throw new Error(`Layout Name is required.`);
    }
    switch (strategy) {
      case LayoutRetrievalStrategy.localStorage:
      case LayoutRetrievalStrategy.fileSystem:
        return this.http.get<LayoutModel>(layoutName + '.json');
      default:
        throw new Error(
          `LayoutRetrievalStrategy '${strategy} not implemented.`
        );
    }
  }
}
