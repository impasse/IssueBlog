//Prefer use old data and fetch new data concurrent
const PERFIX = 'ISSUEBLOG_POST';
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
        return k.startsWith(PERFIX) && /\d$/.test(k);
      } else {
        return k.startsWith(PERFIX);
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
    return new LocalStorage();
  } else {
    return new MemoryStorage();
  }
}

export default Storage();
