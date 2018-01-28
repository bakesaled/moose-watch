import {
  ChangeDetectionStrategy,
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

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
