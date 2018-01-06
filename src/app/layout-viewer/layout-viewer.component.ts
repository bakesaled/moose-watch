import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutModel } from '../../lib/core/models/layout.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mw-layout-viewer',
  templateUrl: './layout-viewer.component.html',
  styleUrls: ['./layout-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutViewerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public layoutModel: LayoutModel;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      Observable.combineLatest(
        this.route.params,
        this.route.queryParams,
        (params, qparams) => ({ params, qparams })
      ).subscribe(value => {
        const layout = new LayoutModel(
          value.params['id'],
          value.qparams['name']
        );
        const retrievalStrategy = value.qparams['retrievalStrategy'];
        if (retrievalStrategy) {
          layout.retrievalStrategy = retrievalStrategy;
        }
        this.layoutModel = layout;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
