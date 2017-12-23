import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SaveService {

  constructor(private localStorageService: LocalStorageService) { }

  save(key: string, data: any) {
    this.localStorageService.setItem(key, data);
  }

  deyaledSave(key: string, data: any) {

  }
}
