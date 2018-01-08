import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LayoutListModel } from '../core/models';
import { LayoutListService, MessageService } from '../core/services';
import { Subscription } from 'rxjs/Subscription';
import { WorkAreaMessage } from '../core/messages/work-area.message';
import { Command } from '../core/enums';
import { Guid } from '../core/utils';

@Component({
  selector: 'mw-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public layoutViewListSubject: BehaviorSubject<
    LayoutListModel
  > = new BehaviorSubject<LayoutListModel>(null);
  public layoutViewList$: Observable<
    LayoutListModel
  > = this.layoutViewListSubject.asObservable();

  public layoutEditListSubject: BehaviorSubject<
    LayoutListModel
  > = new BehaviorSubject<LayoutListModel>(null);
  public layoutEditList$: Observable<
    LayoutListModel
  > = this.layoutEditListSubject.asObservable();

  constructor(
    public layoutListService: LayoutListService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.messageService.channel(WorkAreaMessage).subscribe(msg => {
        if (msg.command === Command.edit) {
          console.log('edit command');
          this.loadNavItems();
        }
      })
    );
    this.loadNavItems();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get newLayoutId() {
    return Guid.create();
  }

  loadNavItems() {
    let storageModel = this.layoutListService.loadFromStorage();
    const model = new LayoutListModel();
    if (storageModel) {
      model.items = model.items.concat(storageModel.items);
    } else {
      storageModel = new LayoutListModel();
    }
    this.layoutEditListSubject.next(storageModel);
    if (model) {
      this.layoutViewListSubject.next(model);
    }
  }
}
