import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CellModel } from '../../core/models/cell.model';
import { FlexLayoutShimService } from '../../core';
import { DropEvent, MwComponent } from '../../core/interfaces';

@Component({
  selector: 'mw-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MwCellComponent implements OnInit, MwComponent {
  private cellModel: CellModel = CellModel.empty;

  hasContent: boolean;

  @Input()
  get model(): CellModel {
    return this.cellModel;
  }
  set model(value: CellModel) {
    this.cellModel = value;
    this.fxFlex = this.cellModel.width;
    this.style = this.flexShim.getStyle('fxFlex', this.cellModel.width);
    this.backgroundColor = this.cellModel.backgroundColor;
    this.margin = `${this.cellModel.margin}px`;
  }

  @Output() dropSuccessEmitter = new EventEmitter<DropEvent>();

  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  @HostBinding('style.margin') margin;

  constructor(private flexShim: FlexLayoutShimService) {}

  ngOnInit() {}
}
