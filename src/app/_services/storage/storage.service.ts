import { StubStorage } from './stub-storage';

const KEY_PREFIX = 'KIDSLOOP_';

export class StorageService {
  readonly supported: boolean;

  constructor(
    private storage: Storage,
  ) {
    this.supported = !(storage instanceof StubStorage);
  }

  set<T extends JsonType>(key: string, data: T): void {
    this.setToStorage(key, this.serialize(data));
  }

  get<T extends JsonType>(key: string): T | null {
    const data = this.getFromStorage(key);
    return data ? this.normalize(data) : null;
  }

  has(key: string): boolean {
    return this.getFromStorage(key) !== null;
  }

  remove(key: string): void {
    this.removeFromStorage(key);
  }

  protected setToStorage(key: string, str: string): void {
    this.storage.setItem(KEY_PREFIX + key, str);
  }

  protected getFromStorage(key: string): string | null {
    return this.storage.getItem(KEY_PREFIX + key);
  }

  protected removeFromStorage(key: string): void {
    this.storage.removeItem(KEY_PREFIX + key);
  }

  protected serialize(data: JsonType): string {
    return JSON.stringify(data);
  }

  protected normalize<T extends JsonType>(data: string): T | null {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
}
