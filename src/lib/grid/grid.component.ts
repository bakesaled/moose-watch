import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { GridModel } from '../core/models';
import { FlexLayoutShimService } from '../core';

@Component({
  selector: 'mw-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class MwGridComponent implements OnChanges {
  @Input() model: GridModel = GridModel.empty;
  @HostBinding('attr.fxLayout') fxLayout = 'row';
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  constructor(private flexShim: FlexLayoutShimService) {
  }

  ngOnChanges() {
    this.style = this.flexShim.getStyle('fxLayout', 'row')
    this.backgroundColor = this.model.backgroundColor;
  }

}
