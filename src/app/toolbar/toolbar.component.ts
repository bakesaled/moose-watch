import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../core/services';
import { ToolbarMessage } from '../core/messages/toolbar.message';
import { Command } from '../core/enums';
import { MediaMatcher } from '@angular/cdk/layout';
import { Constants } from '../core';

@Component({
  selector: 'mw-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-toolbar') toolbarClass = true;

  private subscriptions: Subscription[] = [];
  private mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  @HostBinding('class.mw-is-mobile')
  get toolbarIsMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia(Constants.mobileMediaQuery);
    this.mobileQueryListener = () => this.changeDetector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  onDeleteClick() {
    this.messageService.publish(ToolbarMessage, {
      command: Command.delete
    });
  }

  onNavToggleClick() {
    this.messageService.publish(ToolbarMessage, {
      command: Command.navToggle
    });
  }
}
