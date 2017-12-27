import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SaveService {
  constructor(private localStorageService: LocalStorageService) {}

  save(key: string, data: any) {
    const json = JSON.stringify(data);
    console.log('saving', key, json);
    this.localStorageService.setItem(key, json);
  }

  deyaledSave(key: string, data: any) {}
}
