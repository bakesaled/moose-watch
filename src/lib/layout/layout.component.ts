import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutRetrievalStrategy } from './layout-retrieval-strategy';
import { LayoutService } from './layout.service';
import { LayoutModel } from '../core/models';

@Component({
  selector: 'mw-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MwLayoutComponent implements OnInit {
  model: LayoutModel = new LayoutModel();

  @Input()
  retrievalStrategy: LayoutRetrievalStrategy = LayoutRetrievalStrategy.fileSystem;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService
      .get(this.retrievalStrategy, 'basic-layout')
      .subscribe(model => {
        this.model = model;
      });
  }
}
