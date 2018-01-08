import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
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
export class MwLayoutComponent
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  private subscriptions: Subscription[] = [];
  private layoutModel: LayoutModel;

  model: LayoutModel = new LayoutModel();

  @Input() baseUrl: string;
  @Input()
  get layout(): LayoutModel {
    return this.layoutModel;
  }
  set layout(newValue: LayoutModel) {
    this.layoutModel = newValue;
    this.loadLayout();
  }

  constructor(
    private layoutService: LayoutService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges() {}

  ngAfterViewChecked() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadLayout() {
    this.model = this.layoutService.loadFromStorage(this.layout);
    this.changeDetector.markForCheck();
  }
}
