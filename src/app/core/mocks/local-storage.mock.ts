// export class MockLocalStorage {
//   // private str: Object;
//   // private get store(): Object {
//   //   if (!this.str) {
//   //     console.log('no str');
//   //     this.str = {};
//   //     console.log('no str??', this.str);
//   //   }
//   //   return this.str;
//   // }
//   store: Object = {};
//
//   constructor() {
//     this.store = {};
//   }
//
//   public getItem(key: string): string {
//     return key in this.store ? this.store[key] : null;
//   }
//
//   public setItem(key: string, item: string) {
//     if (!this.store) {
//       // this.store = {};
//       console.log('noooo', this.store);
//     }
//     this.store[key] = item;
//   }
//
//   public removeItem(key: string) {
//     this.store[key] = undefined;
//   }
//
//   public clear() {
//     this.store = {};
//   }
//
// }
let store = {};
export const mockLocalStorage = {
  getItem: (key: string): string => {
    return store[key];
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};
