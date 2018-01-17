import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mw-selection-tag',
  templateUrl: './selection-tag.component.html',
  styleUrls: ['./selection-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionTagComponent implements OnInit {
  private parentEl: HTMLElement;

  @HostBinding('class.mw-selection-tag') selectionTagClass = true;
  @HostBinding('class.mw-selection-tag--visible')
  @Input()
  visible: boolean;

  @Input() icon: string;

  @Input() text: string;

  borderRect: ClientRect;

  constructor(
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.parentEl = this.el.nativeElement.parentElement;
    this.parentEl.onmouseenter = (event: MouseEvent) => {
      const parentRect: any = this.parentEl.getBoundingClientRect();

      // adjust for border
      parentRect.width = parentRect.width - 2;
      parentRect.height = parentRect.height - 2;

      this.borderRect = parentRect;
      if (event.target === this.parentEl) {
        this.visible = true;
      }
      this.changeDetector.markForCheck();
    };
    this.parentEl.onmouseout = (event: MouseEvent) => {
      let found = false;
      for (let i = 0; i < this.parentEl.children.length; i++) {
        if (event.target === this.parentEl.children[i]) {
          found = true;
          break;
        }
      }
      if (found && event.toElement === this.parentEl) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      this.changeDetector.markForCheck();
    };
  }
}
