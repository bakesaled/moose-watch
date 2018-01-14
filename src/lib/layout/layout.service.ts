import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutModel } from '../core/models/layout.model';
import 'rxjs/add/observable/of';
import { LocalStorageService } from '../core/services/local-storage.service';

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

  loadFromFileSystem(layout: LayoutModel, baseUrl: string = '') {
    return this.http.get<LayoutModel>(`${baseUrl + layout.name}.json`);
  }
}
