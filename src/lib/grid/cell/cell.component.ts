import {
  ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild, ViewContainerRef,
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
  private isEditMode: boolean;

  @ViewChild('dynamic', { read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  hasContent: boolean;

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

  @Output() dropSuccessEmitter = new EventEmitter<DropEvent>();

  @HostBinding('attr.fxFlex') fxFlex;
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  @HostBinding('style.margin') margin;

  handleDrop(event: DropEvent) {
    console.log('cell drop', event);
    this.dropSuccessEmitter.emit(event);
  }

  handleAllowDrop(data: any) {
    return (dragData: any) => {
      if (dragData !== data) {
        console.log('drop not allowed', dragData);
      }

      return dragData === data;
    }
  }

  constructor(private flexShim: FlexLayoutShimService) {
  }

  ngOnInit() {

  }

}
