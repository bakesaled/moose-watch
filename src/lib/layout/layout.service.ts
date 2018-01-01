import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutModel } from '../core/models/index';
import { Observable } from 'rxjs/Observable';
import { LayoutRetrievalStrategy } from './layout-retrieval-strategy';

@Injectable()
export class LayoutService {
  private readonly baseUrl = './assets/layouts/';
  constructor(private http: HttpClient) {}

  get(
    strategy: LayoutRetrievalStrategy,
    layoutName: string
  ): Observable<LayoutModel> {
    switch (strategy) {
      case LayoutRetrievalStrategy.localStorage:
      case LayoutRetrievalStrategy.fileSystem:
        return this.http.get<LayoutModel>(this.baseUrl + layoutName + '.json');
      default:
        throw new Error(
          `LayoutRetrievalStrategy '${strategy} not implemented.`
        );
    }
  }
}
