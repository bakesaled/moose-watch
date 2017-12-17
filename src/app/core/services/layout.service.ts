import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutModel } from '../../../lib/core/models';

@Injectable()
export class LayoutService {
  private readonly baseUrl = './assets/layouts/';
  constructor(private http: HttpClient) {}

  get(path: string) {
    return this.http.get<LayoutModel>(this.baseUrl + path);
  }
}
