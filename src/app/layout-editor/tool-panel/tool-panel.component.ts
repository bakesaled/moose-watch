import {
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

@Component({
  selector: 'mw-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwToolPanelComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-tool-panel') toolPanelClass = true;

  private subscriptions: Subscription[] = [];
  private selectedTabIndex: number;

  selectedComponentModel: MwEditorComponentModel;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
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
