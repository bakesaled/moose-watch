import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { LayoutRetrievalStrategy } from './layout-retrieval-strategy';
import { LayoutService } from './layout.service';
import { LayoutModel } from '../core/models/layout.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mw-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwLayoutComponent implements OnInit, OnChanges, OnDestroy {
  private subscriptions: Subscription[] = [];
  model: LayoutModel = new LayoutModel();

  @Input() baseUrl: string;
  @Input() layout: LayoutModel;

  constructor(
    private layoutService: LayoutService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.layoutService
        .get(this.layout.retrievalStrategy, this.baseUrl + this.layout.name)
        .subscribe(model => {
          this.model = model;
          this.changeDetector.markForCheck();
        })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.layout && changes.layout.currentValue) {
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
