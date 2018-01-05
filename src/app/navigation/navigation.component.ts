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

@Component({
  selector: 'mw-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public layoutListSubject: BehaviorSubject<
    LayoutListModel
  > = new BehaviorSubject<LayoutListModel>(null);
  public layoutList$: Observable<
    LayoutListModel
  > = this.layoutListSubject.asObservable();

  constructor(
    public layoutListService: LayoutListService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.messageService.channel(WorkAreaMessage).subscribe(msg => {
        if (msg.command === Command.edit) {
          console.log('edit command');
        }
      })
    );
    this.subscriptions.push(
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
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
