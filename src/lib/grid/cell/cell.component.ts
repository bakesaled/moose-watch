import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CellModel } from '../../core/models/cell.model';
import { FlexLayoutShimService } from '../../core';
import { MwComponent } from '../../core/mw.component';

@Component({
  selector: 'mw-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MwCellComponent implements OnInit, MwComponent {
  private cellModel: CellModel = CellModel.empty;
  private isEditMode: boolean;

  @Input() get model(): CellModel {
    return this.cellModel;
  }
  set model(value: CellModel) {
    this.cellModel = value;
    this.editMode = this.cellModel.editMode;
    this.fxFlex = this.cellModel.width;
    this.style = this.flexShim.getStyle('fxFlex', this.cellModel.width);
    this.backgroundColor = this.cellModel.backgroundColor;
    this.margin = `${this.cellModel.margin}px`;
  }

  @HostBinding('class.mw-cell--edit')
  @Input() get editMode(): boolean {
    return this.isEditMode;
  }
  set editMode(value: boolean) {
    this.isEditMode = value;
    if (this.isEditMode) {
      this.cellModel.width = 50;
      this.cellModel.margin = 10;
    }
  }

  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  @HostBinding('style.margin') margin;
  constructor(private flexShim: FlexLayoutShimService) {
  }

  ngOnInit() {

  }

}
