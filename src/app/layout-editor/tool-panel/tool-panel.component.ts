import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorComponentModel } from '../../core/interfaces';
import { MessageService } from '../../core/services';
import { ToolPanelMessage } from '../../core';
import { Command } from '../../core/enums';
import { EditorComponentMessage } from '../../core/messages';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mw-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwToolPanelComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-tool-panel') toolPanelClass = true;

  private subscriptions: Subscription[] = [];

  selectedTabIndex = 0;
  selectedComponentModel: MwEditorComponentModel;

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe(() => {
        this.handleSelectedIndexChange(0);
        this.changeDetector.markForCheck();
      })
    );

    this.subscriptions.push(
      this.messageService
        .channel(EditorComponentMessage)
        .subscribe(msg => this.handleEditorComponentMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleEditorComponentMessage(msg) {
    switch (msg.command) {
      case Command.select:
        this.selectedComponentModel = msg.data;
        if (msg.data) {
          this.handleSelectedIndexChange(1);
          this.changeDetector.markForCheck();
        } else if (this.selectedTabIndex === 1) {
          this.handleSelectedIndexChange(0);
          this.changeDetector.markForCheck();
        }
        break;
    }
  }

  handleSelectedIndexChange(index: number) {
    console.log('index', index, this.selectedTabIndex);
    if (this.selectedTabIndex === undefined && index !== undefined) {
      this.messageService.publish(ToolPanelMessage, {
        command: Command.toolNavToggle,
        data: false // expand
      });
    } else if (this.selectedTabIndex !== undefined && index === undefined) {
      this.messageService.publish(ToolPanelMessage, {
        command: Command.toolNavToggle,
        data: true // collapse
      });
    }

    this.selectedTabIndex = index;
  }
}
