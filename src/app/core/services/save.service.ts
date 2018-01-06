import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { LayoutListItemModel, LayoutListModel } from '../models';
import { LayoutRetrievalStrategy } from '../../../lib/layout/layout-retrieval-strategy';

@Injectable()
export class SaveService {
  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Save layout in local storage and add entry to lookup list.
   * @param {LayoutModel} layout
   */
  save(layout: LayoutModel) {
    // Save layout
    const layoutString = JSON.stringify(layout);
    this.localStorageService.setItem(layout.id, layoutString);

    const listString = this.localStorageService.getItem('layout-list');
    let list = listString
      ? (JSON.parse(listString) as LayoutListModel)
      : undefined;
    if (!list) {
      list = new LayoutListModel();
    }
    const existingItem = list.items.find(item => {
      return item.id === layout.id;
    });

    if (!existingItem) {
      list.items.push(
        new LayoutListItemModel(
          layout.id,
          layout.name,
          LayoutRetrievalStrategy.localStorage
        )
      );
      this.localStorageService.setItem('layout-list', JSON.stringify(list));
    }
  }

  deyaledSave(key: string, data: any) {}
}
