import {
  AfterViewInit,
  Component, EventEmitter, HostBinding, OnInit, Output, QueryList, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from './cell';
import { CellModel } from '../../core/models/cell.model';
import { FlexLayoutShimService } from '../../core';
import { MwEditorComponent } from '../../core/interfaces';
import { GridModel } from '../../core/models';

@Component({
  selector: 'mw-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwEditorGridComponent implements OnInit, AfterViewInit, MwEditorComponent {
  @HostBinding('class.mw-editor-grid') editorGridClass = true;
  @HostBinding('attr.fxLayout') fxLayout = 'row';
  @HostBinding('attr.style') style;

  @ViewChildren(MwEditorCellComponent) cellComponents: QueryList<MwEditorCellComponent>;

  @Output() afterViewInitEmitter = new EventEmitter<void>();

  model: GridModel;

  constructor(private flexShim: FlexLayoutShimService) { }

  ngOnInit() {
    this.style = this.flexShim.getStyle('fxLayout', 'row');
  }

  ngAfterViewInit() {
    console.log('after view', this.cellComponents);
    this.afterViewInitEmitter.emit();
  }
}
