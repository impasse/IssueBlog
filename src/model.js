import 'whatwg-fetch'
import Storage from './storage'
import { owner, repo } from './const'

const FETCH_ALL_TIME = 'FETCH_ALL_TIME';

// cache expires after 1h, if cache available, not request remote
export const Post = {
  perfix: 'https://api.github.com',
  timeout: 60 * 60 * 1000,

  async get(number) {
    let post = Storage.get(number);
    if (post && (Date.now() <= (post.fetch_time + Post.timeout))) {
      return post;
    } else {
      let res = await fetch(`${Post.perfix}/repos/${owner}/${repo}/issues/${number}`, {
        cors: 'include'
      });
      let data = await res.json();

      let post = {
        title: data.title,
        date: data.created_at,
        body: data.body,
        state: data.state,
        number: data.number,
        tags: data.labels.map(label => {
          return {
            name: label.name,
            color: label.color
          };
        }),
        fetch_time: Date.now()
      };
      Storage.set(post.number, post);
      return await Post.get(number);
    }
  },
  async all() {
    let time = Storage.get(FETCH_ALL_TIME) || 0;
    if (Date.now() <= (time + Post.timeout)) {
      return Storage.keys().sort((a, b) => b - a).map(Storage.get);
    } else {
      let res = await fetch(`${Post.perfix}/repos/${owner}/${repo}/issues?filter=created&state=all`, {
        cors: 'include'
      });

      Storage.keys().map(Storage.delete); //delete all

      let data = await res.json();
      data.filter(single => {
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
      return await Post.all();
    }
  }
}
