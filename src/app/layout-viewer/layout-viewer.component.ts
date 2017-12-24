import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { LayoutModel } from '../../lib/core/models';
import 'rxjs/add/operator/map';

@Component({
  selector: 'mw-layout-viewer',
  templateUrl: './layout-viewer.component.html',
  styleUrls: ['./layout-viewer.component.scss']
})
export class LayoutViewerComponent implements OnInit {
  model: LayoutModel = LayoutModel.empty;
  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.get('basic-layout.json').subscribe(model => {
      this.model = model;
    });
  }


}
