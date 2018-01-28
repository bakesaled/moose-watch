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

  opened = true;

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.messageService
        .channel(ToolbarMessage)
        .subscribe(msg => this.handleToolbarMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
