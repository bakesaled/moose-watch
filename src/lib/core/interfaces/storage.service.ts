export interface StorageService {
  hasKey(key: string);
  getItem(key: string): string;
  setItem(key: string, item: string): void;
  removeItem(key: string): void;
  clearItems();
}
