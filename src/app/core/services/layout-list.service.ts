import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutListModel } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class LayoutListService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  public loadFromFileSystem(): Observable<LayoutListModel> {
    return this.http.get<LayoutListModel>('./assets/layouts/layouts-list.json');
  }

  public loadFromStorage(): LayoutListModel {
    const layoutList = this.storageService.getItem('layout-list');
    return JSON.parse(layoutList);
  }
}
