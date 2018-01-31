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
import { ToolbarMessage } from '../core/messages';
import { MessageService } from '../core/services';
import { Command } from '../core/enums';
import { MediaMatcher } from '@angular/cdk/layout';
import { Constants } from '../core';

@Component({
  selector: 'mw-main-sidenav-container',
  templateUrl: './main-sidenav-container.component.html',
  styleUrls: ['./main-sidenav-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSidenavContainerComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-main-sidenav-container') mainSideNavClass = true;

  private subscriptions: Subscription[] = [];
  private mobileQueryListener: () => void;

  opened = true;
  mobileQuery: MediaQueryList;

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia(Constants.mobileMediaQuery);
    this.mobileQueryListener = () => this.changeDetector.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.opened = !this.mobileQuery.matches;
    this.subscriptions.push(
      this.messageService
        .channel(ToolbarMessage)
        .subscribe(msg => this.handleToolbarMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  private handleToolbarMessage(msg) {
    switch (msg.command) {
      case Command.navToggle:
        this.opened = !this.opened;
        this.changeDetector.markForCheck();
        break;
    }
  }
}
