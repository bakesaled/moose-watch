import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MwComponent } from '../core/interfaces/mw.component';
import { GridModel } from '../core/models/grid.model';
import { MwCellComponent } from './cell/cell.component';
import { FlexLayoutShimService } from '../core/services/flex-layout-shim.service';

@Component({
  selector: 'mw-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MwGridComponent implements OnChanges, MwComponent, AfterViewInit {
  private gridModel: GridModel = new GridModel();

  @ViewChildren(MwCellComponent) cellComponents: QueryList<MwCellComponent>;

  @Input()
  get model(): GridModel {
    return this.gridModel;
  }
  set model(value: GridModel) {
    this.gridModel = value;
    if (this.gridModel) {
      this.style = this.flexShim.getStyle('fxLayout', 'row');
      this.backgroundColor = this.gridModel.backgroundColor;
    }
  }

  @HostBinding('attr.fxLayout') fxLayout = 'row';
  @HostBinding('attr.style') style;
  @HostBinding('style.backgroundColor') backgroundColor;
  @HostBinding('style.height') height;
  @HostBinding('style.width') width;

  @Output() afterViewInitEmitter = new EventEmitter<void>();

  constructor(
    private flexShim: FlexLayoutShimService,
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    // this.style = this.flexShim.getStyle('fxLayout', 'row')
    // this.backgroundColor = this.model.backgroundColor;
  }

  ngAfterViewInit() {
    this.afterViewInitEmitter.emit();
  }
}
