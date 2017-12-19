import {
  ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { GridModel } from '../core/models';
import { FlexLayoutShimService } from '../core';

@Component({
  selector: 'mw-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MwGridComponent implements OnChanges {
  private modelVal: GridModel = GridModel.empty;
  private isEditMode: boolean;

  @Input() get model(): GridModel {
    return this.modelVal;
  }
  set model(value: GridModel) {
    this.modelVal = value;
    this.style = this.flexShim.getStyle('fxLayout', 'row');
    this.backgroundColor = this.modelVal.backgroundColor;
  }

  @HostBinding('class.mw-grid--edit')
  @Input() get editMode(): boolean {
    return this.isEditMode;
  }
  set editMode(value: boolean) {
    this.isEditMode = value;
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
