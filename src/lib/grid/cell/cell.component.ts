import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CellModel } from '../../core/models/cell.model';
import { FlexLayoutShimService } from '../../core';

@Component({
  selector: 'mw-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class MwCellComponent implements OnInit {
  @Input() model: CellModel = CellModel.empty;
  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  @HostBinding('style.margin') margin;
  constructor(private flexShim: FlexLayoutShimService) {
  }

  ngOnInit() {
    this.fxFlex = this.model.width;
    this.style = this.flexShim.getStyle('fxFlex', this.model.width);
    this.backgroundColor = this.model.backgroundColor;
    this.margin = `${this.model.margin}px`;
  }

}
