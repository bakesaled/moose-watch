import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutModel } from '../../lib/core/models/layout.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mw-layout-viewer',
  templateUrl: './layout-viewer.component.html',
  styleUrls: ['./layout-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutViewerComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-layout-viewer') layoutViewerClass = true;

  private subscriptions: Subscription[] = [];
  public layoutModel: LayoutModel;

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe((data: { layout: LayoutModel }) => {
        this.layoutModel = data.layout;
        this.changeDetector.markForCheck();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
