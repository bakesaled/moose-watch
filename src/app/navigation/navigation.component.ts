import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LayoutListModel } from '../core/models';
import { LayoutListService, MessageService } from '../core/services';
import { Subscription } from 'rxjs/Subscription';
import { WorkAreaMessage } from '../core/messages/work-area.message';
import { Command } from '../core/enums';
import { Guid } from '../core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'mw-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-navigation') navigationClass = true;

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
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.messageService
        .channel(WorkAreaMessage)
        .subscribe(msg => this.handleWorkAreaMessage(msg))
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

  private handleWorkAreaMessage(msg) {
    switch (msg.command) {
      case Command.edit:
        console.log('edit command');
        this.loadNavItems();
        if (msg.data) {
          this.router.navigate(['/layout-editor/' + msg.data.id], {
            queryParams: { name: msg.data.name }
          });
        }
        break;
      case Command.delete:
        console.log('delete command');
        this.loadNavItems();
        this.router.navigate(['/']);
        break;
    }
  }
}
