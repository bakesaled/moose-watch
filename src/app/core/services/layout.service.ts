import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutModel } from '../../../lib/core/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LayoutService {
  private readonly baseUrl = './assets/layouts/';
  constructor(private http: HttpClient) {}

  get(path: string): Observable<LayoutModel> {
    return this.http.get<LayoutModel>(this.baseUrl + path);
  }
}
