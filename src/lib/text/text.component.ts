import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { TextModel } from '../core/models/text.model';
import { MwComponent } from '../core/interfaces/mw.component';

@Component({
  selector: 'mw-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwTextComponent implements OnInit, MwComponent {
  private textModel: TextModel = new TextModel();

  @HostBinding('class.mw-text') textClass = true;
  @HostBinding('style.font-style') fontStyle: string;
  @HostBinding('style.font-weight') fontWeight: string;
  @HostBinding('style.font-size') fontSize: string;

  @Input()
  get model(): TextModel {
    return this.textModel;
  }
  set model(value: TextModel) {
    this.textModel = value;
    if (this.textModel) {
      this.fontStyle = this.textModel.fontStyle;
      this.fontWeight = this.textModel.fontWeight;
      this.fontSize = this.textModel.fontSize;
    }
    this.changeDetector.markForCheck();
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}
}
