import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutListService } from '../core/services/layout-list.service';
import { LayoutListModel } from '../core/models/layout-list.model';

@Component({
  selector: 'mw-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  list: LayoutListModel = new LayoutListModel([]);

  constructor(public layoutListService: LayoutListService) {}

  ngOnInit() {
    this.layoutListService.layoutListSubject.subscribe(model => {
      if (model) {
        this.list = Object.assign(model, {});
      }
    });
    this.layoutListService.loadLayoutList();
  }
}
