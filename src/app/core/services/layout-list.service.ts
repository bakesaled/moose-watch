import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LayoutListModel } from '../models/layout-list.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LayoutListService {
  public layoutList: LayoutListModel;
  public layoutListNull: LayoutListModel = null;
  public layoutListSubject: BehaviorSubject<LayoutListModel> = new BehaviorSubject<LayoutListModel>(null);
  public layoutList$: Observable<LayoutListModel> = this.layoutListSubject.asObservable();

  constructor(private http: HttpClient) {}

  public loadLayoutList() {
    // Only want to do this once - if root page is revisited, it calls this again.
    if (this.layoutList === null || this.layoutList === undefined) {
      console.log('Loading env-specific.json');

      return this.http.get<LayoutListModel>('./assets/layouts/layouts-list.json')
        .subscribe(model => {
          this.layoutListSubject.next(model);
        });
    }
  }
}
