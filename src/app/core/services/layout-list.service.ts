import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutListModel } from '../models';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';

@Injectable()
export class LayoutListService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  public loadFromFileSystem(): Observable<LayoutListModel> {
    return this.http.get<LayoutListModel>('./assets/layouts/layouts-list.json');
  }

  public loadFromStorage(): LayoutListModel {
    const layoutList = this.storageService.getItem('layout-list');
    return JSON.parse(layoutList);
  }

  public getNextUniqueName(layoutList: LayoutListModel) {
    if (!layoutList.items.length) {
      return 'new-layout-0';
    }
    const newItems = layoutList.items.filter(item => {
      return item.name.startsWith('new-layout-');
    });
    if (!newItems.length) {
      return 'new-layout-0';
    }
    newItems.sort((itemA, itemB) => {
      if (itemA.name < itemB.name) {
        return -1;
      }
      if (itemA.name > itemB.name) {
        return 1;
      }

      return 0;
    });

    let lastNumber = +newItems[newItems.length - 1].name.replace(
      'new-layout-',
      ''
    );
    return `new-layout-${++lastNumber}`;
  }
}
