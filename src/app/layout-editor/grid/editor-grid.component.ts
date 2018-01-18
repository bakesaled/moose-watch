import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MwEditorCellComponent } from './cell';
import { MwEditorComponent } from '../../core/interfaces';
import { FlexLayoutShimService } from '../../../lib/core/services/flex-layout-shim.service';
import { EditorGridModel } from '../models';

@Component({
  selector: 'mw-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MwEditorGridComponent
  implements OnInit, AfterViewInit, MwEditorComponent {
  @HostBinding('class.mw-editor-grid') editorGridClass = true;
  @HostBinding('style.backgroundColor') backgroundColor;

  fxLayout = 'row';
  style;
  dragEnabled = false;

  private gridModel: EditorGridModel;

  @ViewChildren(MwEditorCellComponent)
  cellComponents: QueryList<MwEditorCellComponent>;

  @Output() afterViewInitEmitter = new EventEmitter<void>();

  @Input()
  get model(): EditorGridModel {
    return this.gridModel;
  }
  set model(newValue: EditorGridModel) {
    this.gridModel = newValue;
    this.style = this.flexShim.getStyle('fxLayout', 'row');
    this.backgroundColor = this.gridModel.backgroundColor;
    this.changeDetector.markForCheck();
    console.log('gridModel', this.gridModel);
  }

  constructor(
    private flexShim: FlexLayoutShimService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.model) {
      this.model = new EditorGridModel();
    }
  }

  ngAfterViewInit() {
    this.afterViewInitEmitter.emit();
  }

  onMouseEnter() {
    this.dragEnabled = true;
  }

  onMouseOut() {
    this.dragEnabled = false;
  }
}
