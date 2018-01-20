import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutModel } from '../core/models/layout.model';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LayoutService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  loadFromStorage(layout: LayoutModel): LayoutModel {
    const layoutString = this.localStorageService.getItem(layout.id);
    if (layoutString) {
      return JSON.parse(layoutString);
    } else {
      return undefined;
    }
  }

  loadFromFileSystem(
    layout: LayoutModel,
    baseUrl: string = ''
  ): Observable<LayoutModel> {
    return this.http.get<LayoutModel>(`${baseUrl + layout.name}.json`);
  }
}
