import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutListItemModel, LayoutListModel } from '../models';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import { Constants } from '../constants';

@Injectable()
export class LayoutListService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  public loadFromFileSystem(): Observable<LayoutListModel> {
    return this.http.get<LayoutListModel>(
      `./assets/layouts/${Constants.layoutListId}.json`
    );
  }

  public loadFromStorage(): LayoutListModel {
    const layoutList = this.storageService.getItem(Constants.layoutListId);
    if (layoutList) {
      return JSON.parse(layoutList);
    } else {
      return new LayoutListModel([]);
    }
  }

  public deleteItem(id: string) {
    const layoutList: LayoutListModel = this.loadFromStorage();
    const itemToDelete = layoutList.items.find(item => item.id === id);
    layoutList.items.splice(layoutList.items.indexOf(itemToDelete), 1);
    this.storageService.setItem(
      Constants.layoutListId,
      JSON.stringify(layoutList)
    );
  }

  public saveItem(listItem: LayoutListItemModel) {
    const layoutList: LayoutListModel = this.loadFromStorage();
    const existingItem = layoutList.items.find(item => item.id === listItem.id);
    if (existingItem) {
      layoutList.items[layoutList.items.indexOf(existingItem)] = listItem;
    } else {
      layoutList.items.push(listItem);
    }
    this.storageService.setItem(
      Constants.layoutListId,
      JSON.stringify(layoutList)
    );
  }

  public getUniqueLayoutName(name: string) {
    const list = this.loadFromStorage();
    return this.getNextUniqueName(list, name);
  }

  private getNextUniqueName(
    layoutList: LayoutListModel,
    name: string = Constants.newLayoutBaseName
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
