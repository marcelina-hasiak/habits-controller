export class AppStorage {
  constructor() {
    this.storage = localStorage;
  }
  set(key, value) {
    const test = JSON.stringify(value)
    this.storage.setItem(key, JSON.stringify(value));
  }
  get(key) {
    const data = this.storage.getItem(key);
    return JSON.parse(data);
  }
};
