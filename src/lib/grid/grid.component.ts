import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { GridModel } from '../core/models';
import { FlexLayoutShimService } from '../core';

@Component({
  selector: 'mw-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class MwGridComponent implements OnInit {
  @HostBinding('attr.fxLayout') fxlayout = 'row';
  @HostBinding('attr.style') style = this.flexShim.getStyle('fxLayout', 'row');
  @Input() model: GridModel;
  constructor(private flexShim: FlexLayoutShimService) {
  }

  ngOnInit() {
  }

}
