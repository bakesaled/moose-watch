import {
  ChangeDetectionStrategy,
  Component,
  HostBinding, Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MwEditorComponentModel } from '../../core/interfaces';

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

  @Input()
  componentModel: MwEditorComponentModel;

  constructor(
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
