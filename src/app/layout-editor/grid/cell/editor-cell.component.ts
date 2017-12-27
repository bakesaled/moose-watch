import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { DropEvent, MwEditorComponent } from '../../../core/interfaces';
import { CellModel } from '../../../../lib/core/models';
import { FlexLayoutShimService } from '../../../../lib/core/services';

@Component({
  selector: 'mw-editor-cell',
  templateUrl: './editor-cell.component.html',
  styleUrls: ['./editor-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwEditorCellComponent implements OnInit, MwEditorComponent {
  @HostBinding('class.mw-editor-cell') editorCellClass = true;
  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Output() dropSuccessEmitter = new EventEmitter<DropEvent>();

  hasContent: boolean;
  model: CellModel;

  constructor(private flexShim: FlexLayoutShimService) {}

  ngOnInit() {
    this.model = CellModel.empty;
    this.model.width = 50;
    this.fxFlex = this.model.width;
    this.style = this.flexShim.getStyle('fxFlex', this.model.width);
  }

  handleDrop(event: DropEvent) {
    console.log('cell drop', event);
    this.dropSuccessEmitter.emit(event);
  }
}
