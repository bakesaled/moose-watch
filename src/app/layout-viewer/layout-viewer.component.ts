import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { LayoutModel } from '../../lib/core/models';

@Component({
  selector: 'mw-layout-viewer',
  templateUrl: './layout-viewer.component.html',
  styleUrls: ['./layout-viewer.component.scss']
})
export class LayoutViewerComponent implements OnInit {
  model: LayoutModel;
  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.get('basic-layout.json').subscribe(model => {
      this.model = model;
    });
  }

}
