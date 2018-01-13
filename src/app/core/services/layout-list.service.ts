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
    if (layoutList) {
      return JSON.parse(layoutList);
    } else {
      return new LayoutListModel([]);
    }
  }

  public getUniqueLayoutName(name: string) {
    const list = this.loadFromStorage();
    return this.getNextUniqueName(list, name);
  }

  private getNextUniqueName(
    layoutList: LayoutListModel,
    name: string = 'new-layout'
  ) {
    if (!layoutList.items.length) {
      return `${name}-0`;
    }
    const newItems = layoutList.items.filter(item => {
      return item.name.startsWith(`${name}-`);
    });
    if (!newItems.length) {
      return `${name}-0`;
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
      `${name}-`,
      ''
    );
    return `${name}-${++lastNumber}`;
  }
}
