import { Component, OnInit } from '@angular/core';
import { DropEvent } from '../../core/interfaces';
import { MessageService } from '../../core/services';
import { ToolPanelMessage } from '../../core';
import { Command } from '../../core/enums';

@Component({
  selector: 'mw-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss']
})
export class MwToolPanelComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  handleDropSuccess(event: DropEvent) {
    console.log('deleted', event);
    this.messageService.publish(ToolPanelMessage, {
      command: Command.delete,
      data: event
    });
  }
}
