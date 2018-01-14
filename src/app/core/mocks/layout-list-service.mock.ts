import { LayoutListItemModel, LayoutListModel } from '../models';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';

export class MockLayoutListService {
  public loadFromFileSystem(): Observable<LayoutListModel> {
    const layoutList = new LayoutListModel([
      new LayoutModel('testIdFromFile', 'testNameFromFile')
    ]);
    return Observable.of(layoutList);
  }

  public loadFromStorage(): LayoutListModel {
    const layoutList = localStorage.getItem(Constants.layoutListId);
    return JSON.parse(layoutList);
  }

  public saveItem(listItem: LayoutListItemModel) {
    const layoutList: LayoutListModel = this.loadFromStorage();
    const existingItem = layoutList.items.find(item => item.id === listItem.id);
    if (existingItem) {
      layoutList.items[layoutList.items.indexOf(existingItem)] = listItem;
    } else {
      layoutList.items.push(listItem);
    }
    localStorage.setItem(Constants.layoutListId, JSON.stringify(layoutList));
  }
}
