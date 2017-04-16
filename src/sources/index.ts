import axios from 'axios'

import * as pages from './pages'

export const posts = (async () => {
    const data = (await axios.get('https://api.github.com/repos/lingmm/IssueBlog/issues?creator=lingmm&state=all')).data;
    return data
    .filter(post => post.state !== 'closed')
    .map(post => {
        return {
            title: post.title,
            id: post.number
        };
    });
})();

export async function post({ id }) {
    const data = (await axios.get(`https://api.github.com/repos/lingmm/IssueBlog/issues/${id}`)).data;
    return data;
}

export function page({ id }) {
    return pages[id];
}