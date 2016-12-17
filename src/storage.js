const PERFIX = 'ISSUEBLOG_POST';
const TEST = 'TEST';

//maybe can inject to String prototype,don't like
function genStartsWith() {
  let support = String.prototype.startsWith !== undefined;
  if (support) {
    return function (str, arg) {
      return str.startsWith(arg);
    }
  } else {
    return function (str, arg) {
      return str.substr(0, arg.length) === arg;
    }
  }
}

let startsWith = genStartsWith();

let LocalStorage = {
  get: k => JSON.parse(localStorage.getItem(`${PERFIX}_${k}`)),
  set: (k, v) => localStorage.setItem(`${PERFIX}_${k}`, JSON.stringify(v)),
  delete: k => localStorage.removeItem(`${PERFIX}_${k}`),
  destory: () => LocalStorage.keys(post_only = false).forEach(LocalStorage.delete),
  keys: (post_only = true) => Object.keys(localStorage).filter(k => {
    if (post_only) {
      return startsWith(k, PERFIX) && /\d$/.test(k);
    } else {
      return startsWith(k, PERFIX);
    }
  }).map(k => k.substring(PERFIX.length + 1)),
  each: func => {
    for (let i of LocalStorage.keys()) {
      func(LocalStorage.get(i), i);
    }
  }
}

let MemoryStorage = {
  _storage: {},
  get: k => MemoryStorage._storage[k],
  set: (k, v) => MemoryStorage._storage[k] = v,
  delete: k => delete MemoryStorage._storage[k],
  destory: () => MemoryStorage._storage = {},
  keys: (post_only = true) => Object.keys(MemoryStorage._storage).filter(k => {
    return post_only ? /\d$/.test(k) : true;
  }),
  each: func => {
    for (let i of MemoryStorage.keys()) {
      func(MemoryStorage.get(i), i);
    }
  }
}

function Storage() {
  if (window.localStorage) {
    //test if in private mode
    try {
      LocalStorage.set(TEST, TEST);
      LocalStorage.delete(TEST);
      return LocalStorage;
    } catch (e) {
      return MemoryStorage;
    }
  } else {
    return MemoryStorage;
  }
}

export default Storage();
