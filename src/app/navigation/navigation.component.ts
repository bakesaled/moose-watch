import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LayoutListModel } from '../core/models';
import { LayoutListService } from '../core/services';

@Component({
  selector: 'mw-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  public layoutListSubject: BehaviorSubject<
    LayoutListModel
  > = new BehaviorSubject<LayoutListModel>(null);
  public layoutList$: Observable<
    LayoutListModel
  > = this.layoutListSubject.asObservable();

  constructor(public layoutListService: LayoutListService) {}

  ngOnInit() {
    this.layoutListService.loadFromFileSystem().subscribe(fileModel => {
      const storageModel = this.layoutListService.loadFromStorage();
      const model = new LayoutListModel();
      if (fileModel) {
        model.items = model.items.concat(fileModel.items);
      }
      if (storageModel) {
        model.items = model.items.concat(storageModel.items);
      }
      if (model) {
        this.layoutListSubject.next(model);
      }
    });
  }
}
