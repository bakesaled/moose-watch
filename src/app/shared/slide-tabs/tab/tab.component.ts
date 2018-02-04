import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'mw-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
  /** Template inside the tab component that contains an `<ng-content>`. */
  @ViewChild(TemplateRef) cont: TemplateRef<any>;

  /** The portal that will be the hosted content of the tab */
  private contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this.contentPortal;
  }

  @Input() label: string;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.contentPortal = new TemplatePortal(this.cont, this.viewContainerRef);
  }
}
