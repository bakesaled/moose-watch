import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mw-selection-tag',
  templateUrl: './selection-tag.component.html',
  styleUrls: ['./selection-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionTagComponent implements OnInit, AfterViewInit {
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
    this.parentEl.onmouseenter = () => {
      this.visible = true;
      this.changeDetector.markForCheck();
    };
    this.parentEl.onmouseleave = () => {
      this.visible = false;
      this.changeDetector.markForCheck();
    };
  }

  ngAfterViewInit() {
    const parentRect: any = this.parentEl.getBoundingClientRect();

    // adjust for border
    parentRect.width = parentRect.width - 2;
    parentRect.height = parentRect.height - 2;

    this.borderRect = parentRect;
    this.changeDetector.markForCheck();
    this.changeDetector.detectChanges();
  }
}
