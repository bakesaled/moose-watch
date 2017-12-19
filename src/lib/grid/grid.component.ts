import {
  ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges,
  ViewEncapsulation
} from '@angular/core';
import { GridModel } from '../core/models';
import { FlexLayoutShimService } from '../core';
import { MwComponent } from '../core/mw.component';
import { CellModel } from '../core/models/cell.model';

@Component({
  selector: 'mw-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MwGridComponent implements OnChanges, MwComponent {
  private gridModel: GridModel = GridModel.empty;
  private isEditMode: boolean;

  @Input() get model(): GridModel {
    return this.gridModel;
  }
  set model(value: GridModel) {
    this.gridModel = value;
    this.style = this.flexShim.getStyle('fxLayout', 'row');
    this.backgroundColor = this.gridModel.backgroundColor;
  }

  @HostBinding('class.mw-grid--edit')
  @Input() get editMode(): boolean {
    return this.isEditMode;
  }
  set editMode(value: boolean) {
    this.isEditMode = value;
    if (this.isEditMode) {
      this.model.cells = [
        CellModel.emptyEdit,
        CellModel.emptyEdit
      ]
    }
  }
  @HostBinding('attr.fxLayout') fxLayout = 'row';
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  @HostBinding('style.height') height;
  @HostBinding('style.width') width;


  constructor(private flexShim: FlexLayoutShimService, private el: ElementRef) {
  }

  ngOnChanges() {
    // this.style = this.flexShim.getStyle('fxLayout', 'row')
    // this.backgroundColor = this.model.backgroundColor;
  }


}
