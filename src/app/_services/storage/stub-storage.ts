export class StubStorage implements Storage {
  length = 0;
  [key: string]: any;
  [index: number]: string;

  clear() {
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  }

  getItem(key: string) {
    return this[key] || null;
  }

  key(index: number) {
    return this[index] || null;
  }

  removeItem(key: string) {
    delete this[key];
  }

  setItem(key: string, data: string) {
    this[key] = data;
  }
}
