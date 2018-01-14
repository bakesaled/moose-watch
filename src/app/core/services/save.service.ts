import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { LayoutListItemModel } from '../models';
import { LayoutListService } from './layout-list.service';

@Injectable()
export class SaveService {
  constructor(
    private localStorageService: LocalStorageService,
    private layoutListService: LayoutListService
  ) {}

  /**
   * Save layout in local storage and add entry to lookup list.
   * @param {LayoutModel} layout
   */
  save(layout: LayoutModel) {
    // Save layout
    const layoutString = JSON.stringify(layout);
    this.localStorageService.setItem(layout.id, layoutString);
    this.layoutListService.saveItem(
      new LayoutListItemModel(layout.id, layout.name)
    );
  }

  delete(id: string) {
    this.localStorageService.removeItem(id);
    this.layoutListService.deleteItem(id);
  }

  deyaledSave(key: string, data: any) {}
}
