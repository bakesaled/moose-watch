import { StorageService } from '../interfaces/storage.service';

export class LocalStorageService implements StorageService {
  public hasKey(key: string): boolean {
    return localStorage.hasKey(key);
  }
  public getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public setItem(key: string, item: string): void {
    localStorage.setItem(key, item);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearItems() {
    localStorage.clear();
  }
}
