import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from './cell';
import { MwEditorComponent } from '../../core/interfaces';
import { GridModel } from '../../../lib/core/models';
import { FlexLayoutShimService } from '../../../lib/core/services';

@Component({
  selector: 'mw-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwEditorGridComponent
  implements OnInit, AfterViewInit, MwEditorComponent {
  @HostBinding('class.mw-editor-grid') editorGridClass = true;
  @HostBinding('attr.fxLayout') fxLayout = 'row';
  @HostBinding('attr.style') style;

  @ViewChildren(MwEditorCellComponent)
  cellComponents: QueryList<MwEditorCellComponent>;

  @Output() afterViewInitEmitter = new EventEmitter<void>();

  model: GridModel = new GridModel();

  constructor(private flexShim: FlexLayoutShimService) {}

  ngOnInit() {
    this.style = this.flexShim.getStyle('fxLayout', 'row');
  }

  ngAfterViewInit() {
    console.log('after view', this.cellComponents);
    this.afterViewInitEmitter.emit();
  }
}
