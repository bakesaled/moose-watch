import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MessageService } from '../core/services';
import { Constants } from '../core';
import { Subscription } from 'rxjs/Subscription';
import { ToolPanelMessage } from '../core/messages';
import { Command } from '../core/enums';

@Component({
  selector: 'mw-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEditorComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-layout-editor') layoutEditorClass = true;

  private subscriptions: Subscription[] = [];
  private mobileQueryListener: () => void;

  collapsed = false;
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
    this.collapsed = this.mobileQuery.matches;
    this.subscriptions.push(
      this.messageService
        .channel(ToolPanelMessage)
        .subscribe(msg => this.handleToolPanelMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  private handleToolPanelMessage(msg) {
    switch (msg.command) {
      case Command.toolNavToggle:
        this.collapsed = !this.collapsed;
        this.changeDetector.markForCheck();
        break;
    }
  }
}
