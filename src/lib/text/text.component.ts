import { Component, Input, OnInit } from '@angular/core';
import { TextModel } from '../core/models/text.model';
import { MwComponent } from '../core/interfaces/mw.component';

@Component({
  selector: 'mw-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class MwTextComponent implements OnInit, MwComponent {
  private textModel: TextModel = new TextModel();

  @Input()
  get model(): TextModel {
    return this.textModel;
  }
  set model(value: TextModel) {
    this.textModel = value;
  }

  constructor() {}

  ngOnInit() {}
}
