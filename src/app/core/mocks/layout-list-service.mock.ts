import { LayoutListModel } from '../models';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { Observable } from 'rxjs/Observable';

export class MockLayoutListService {
  public loadFromFileSystem(): Observable<LayoutListModel> {
    const layoutList = new LayoutListModel([
      new LayoutModel('testIdFromFile', 'testNameFromFile')
    ]);
    return Observable.of(layoutList);
  }

  public loadFromStorage(): LayoutListModel {
    const layoutList = localStorage.getItem('layout-list');
    return JSON.parse(layoutList);
  }
}
