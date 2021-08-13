import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getData(storageKey: string) {
    return JSON.parse(await (await Storage.get({ key: storageKey })).value);
  }

  async setData(storageKey: string, value: any): Promise<void> {
    return await Storage.set({ key: storageKey, value: JSON.stringify(value) });
  }

  async removeData(storageKey: string): Promise<void> {
    return await Storage.remove({ key: storageKey });
  }

  async getKeys(): Promise<{ keys: string[]; }> {
    return await Storage.keys();
  }
}
