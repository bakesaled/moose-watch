import {
  Component, EventEmitter, HostBinding, OnInit, Output, QueryList, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from './cell';
import { CellModel } from '../../core/models/cell.model';
import { FlexLayoutShimService } from '../../core';

@Component({
  selector: 'mw-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwEditorGridComponent implements OnInit {
  @HostBinding('class.mw-editor-grid') designerGridClass = true;
  @HostBinding('attr.fxLayout') fxLayout = 'row';
  @HostBinding('attr.style') style;

  @ViewChildren(MwEditorCellComponent) cellComponents: QueryList<MwEditorCellComponent>;

  @Output() afterViewInitEmitter = new EventEmitter<void>();

  cells: CellModel[];

  constructor(private flexShim: FlexLayoutShimService) { }

  ngOnInit() {
    this.style = this.flexShim.getStyle('fxLayout', 'row');
  }

}
