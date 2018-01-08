import { LayoutModel } from '../../../lib/core/models/layout.model';
import { Observable } from 'rxjs/Observable';

export class MockLayoutService {
  public loadFromFileSystem(): Observable<LayoutModel> {
    const layout = new LayoutModel('testIdFromFile', 'testNameFromFile');
    return Observable.of(layout);
  }

  public get(): LayoutModel {
    const layoutList = localStorage.getItem('testIdFromFile');
    return JSON.parse(layoutList);
  }
}
