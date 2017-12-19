import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TextModel } from '../core/models/text.model';
import { MwComponent } from '../core/mw.component';

@Component({
  selector: 'mw-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class MwTextComponent implements OnInit, MwComponent {
  private textModel: TextModel = TextModel.empty;
  private isEditMode: boolean;

  @Input() get model(): TextModel {
    return this.textModel;
  }
  set model(value: TextModel) {
    this.textModel = value;
  }

  @HostBinding('class.mw-text--edit')
  @Input() get editMode(): boolean {
    return this.isEditMode;
  }
  set editMode(value: boolean) {
    this.isEditMode = value;
    if (this.isEditMode) {
      this.model.value = '[text]';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
