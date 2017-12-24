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
import { GridModel } from '../core/models';
import { FlexLayoutShimService } from '../core';
import { MwCellComponent } from './cell';
import { MwComponent } from '../core/interfaces';

@Component({
  selector: 'mw-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MwGridComponent implements OnChanges, MwComponent, AfterViewInit {
  private gridModel: GridModel = GridModel.empty;

  @ViewChildren(MwCellComponent) cellComponents: QueryList<MwCellComponent>;

  @Input()
  get model(): GridModel {
    return this.gridModel;
  }
  set model(value: GridModel) {
    this.gridModel = value;
    this.style = this.flexShim.getStyle('fxLayout', 'row');
    this.backgroundColor = this.gridModel.backgroundColor;
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
    console.log('after view', this.cellComponents);
    this.afterViewInitEmitter.emit();
  }
}
