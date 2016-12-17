//Prefer use old data and fetch new data concurrent
const PERFIX = 'ISSUEBLOG_POST';
const TEST = 'TEST';

function startsWith(str, arg) {
  if (str['startsWith']) {
    return str.startsWith(arg);
  } else {
    return new RegExp('^' + arg).test(arg);
  }
}

class LocalStorage {

  get(k) {
    return JSON.parse(localStorage.getItem(`${PERFIX}_${k}`));
  }

  set(k, v) {
    localStorage.setItem(`${PERFIX}_${k}`, JSON.stringify(v));
  }

  delete(k) {
    localStorage.removeItem(`${PERFIX}_${k}`);
  }

  destory() {
    this.keys(post_only = false).forEach(this.delete);
  }

  keys(post_only = true) {
    return Object.keys(localStorage).filter(k => {
      if (post_only) {
        return startsWith(k, PERFIX) && /\d$/.test(k);
      } else {
        return startsWith(k, PERFIX);
      }
    }).map(k => k.substring(PERFIX.length + 1));
  }

  each(func) {
    for (let i of this.keys()) {
      func(this.get(i), i);
    }
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

  keys(post_only = true) {
    return Object.keys(this._storage).filter(k => {
      return post_only ? /\d$/.test(k) : true;
    });
  }

  each(func) {
    for (let i of this.keys()) {
      func(this.get(i), i);
    }
  }
}

function Storage() {
  if (window.localStorage) {
    //detect if in private mode
    let storage = new LocalStorage();
    try {
      storage.set(TEST, TEST);
      storage.delete(TEST);
      return storage;
    } catch (e) {
      return new MemoryStorage();
    }
  } else {
    return new MemoryStorage();
  }
}

export default Storage();
