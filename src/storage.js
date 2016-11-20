//Prefer use old data and fetch new data concurrent

class LocalStorage {
  get(k) {
    return JSON.parse(localStorage.getItem(k));
  }

  set(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }

  delete(k) {
    localStorage.removeItem(k);
  }

  destory() {
    localStorage.clear();
  }

  keys() {
    return Object.keys(localStorage);
  }
}
class MemoryStorage {
  constructor() {
    this._storage = {};
  }

  get(k) {
    return this._storage[k];
  }

  set(k, v) {
    this._storage[k] = v;
  }

  delete(k) {
    delete this._storage[k];
  }

  destory() {
    this._storage = {};
  }

  keys() {
    return Object.keys(this._storage);
  }
}

function Storage() {
  if (window.localStorage) {
    return new LocalStorage();
  } else {
    return new MemoryStorage();
  }
}

module.exports = Storage();
