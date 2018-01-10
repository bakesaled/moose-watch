import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { DropEvent, MwEditorComponent } from '../../../core/interfaces';
import { FlexLayoutShimService } from '../../../../lib/core/services/flex-layout-shim.service';
import { EditorCellModel } from '../../../core/models';

@Component({
  selector: 'mw-editor-cell',
  templateUrl: './editor-cell.component.html',
  styleUrls: ['./editor-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorCellComponent
  implements OnInit, MwEditorComponent, OnChanges {
  @HostBinding('class.mw-editor-cell') editorCellClass = true;
  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;

  private cellModel: EditorCellModel;

  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Output() dropSuccessEmitter = new EventEmitter<DropEvent>();

  @Input()
  get model(): EditorCellModel {
    return this.cellModel;
  }
  set model(newValue: EditorCellModel) {
    this.cellModel = newValue;
    this.model.width = 50;
    this.fxFlex = this.model.width;
    this.style = this.flexShim.getStyle('fxFlex', this.model.width);
    console.log('cellModel', newValue);
    this.changeDetector.markForCheck();
  }

  constructor(
    private flexShim: FlexLayoutShimService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorCellModel();
    }
    // this.model.width = 50;
    // this.fxFlex = this.model.width;
    // this.style = this.flexShim.getStyle('fxFlex', this.model.width);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  handleDrop(event: DropEvent) {
    console.log('cell drop', event);
    this.dropSuccessEmitter.emit(event);
  }
}
