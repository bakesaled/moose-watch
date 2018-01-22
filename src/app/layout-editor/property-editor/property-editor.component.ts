import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../core/services';
import { EditorComponentMessage } from '../../core/messages';
import { Command } from '../../core/enums';

@Component({
  selector: 'mw-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyEditorComponent implements OnInit, OnDestroy {
  @HostBinding('class.mw-property-editor') propertyEditorClass = true;

  private subscriptions: Subscription[] = [];

  constructor(
    private messageService: MessageService
  ) {}

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
        console.log('select command');
        break;
    }
  }
}
