import Axios from 'axios'
import Storage from './storage'
import { owner, repo } from './const'

const FETCH_ALL_TIME = 'FETCH_ALL_TIME';

export class Post {
  static perfix = 'https://api.github.com';
  static timeout = 60 * 60 * 1000;

  static get(number) {
    let post = Storage.get(number);
    if (post && (Date.now() <= (post.fetch_time + Post.timeout))) {
      return Promise.resolve(post);
    } else {
      return Axios.get(`${Post.perfix}/repos/${owner}/${repo}/issues/${number}`)
        .then(res => {
          if (res.status === 200) {
            let data = {
              title: res.data.title,
              date: res.data.created_at,
              body: res.data.body,
              state: res.data.state,
              number: res.data.number,
              tags: res.data.labels.map(label => {
                return {
                  name: label.name,
                  color: label.color
                };
              }),
              fetch_time: Date.now()
            };
            Storage.set(data.number, data);
            return Post.get(number);
          } else {
            return Promise.reject(new Error('Failed to fetch post'));
          }
        });
    }
  }
  static all() {
    let time = Storage.get(FETCH_ALL_TIME) || 0;
    if (Date.now() <= (time + Post.timeout)) {
      return Promise.resolve(Storage.keys().sort((a, b) => b - a).map(Storage.get));
    } else {
      return Axios.get(`${Post.perfix}/repos/${owner}/${repo}/issues?filter=created&state=all`)
        .then(res => {
          if (res.status === 200) {
            Storage.keys().map(Storage.delete); //delete all
            res.data.filter(single => {
              return single.state !== 'closed';
            }).forEach(single => {
              let data = {
                title: single.title,
                state: single.state,
                number: single.number,
                body: single.body,
                date: single.created_at,
                tags: single.labels.map(label => {
                  return {
                    name: label.name,
                    color: label.color
                  };
                }),
                fetch_time: Date.now()
              };
              Storage.set(data.number, data);
            });
            Storage.set(FETCH_ALL_TIME, Date.now());
            return Post.all();
          } else {
            return Promise.reject(new Error('Failed to fetch all posts'));
          }
        });
    }
  }
}
