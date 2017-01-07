require("babel-register");
require('colors');
require('stripmargin').inject();
let fetch = require('node-fetch');
let fs = require('bluebird').promisifyAll(require('fs'));
let { owner, repo } = require('./src/const');

(async function () {
    let posts = (await (await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?creator=${owner}&state=all`)).json())
        .filter(post => post.state !== 'closed')
        .map(post => {
            return {
                title: post.title,
                state: post.state,
                number: post.number,
                body: post.body,
                date: post.created_at,
                tags: post.labels.map(label => {
                    return {
                        name: label.name,
                        color: label.color
                    };
                })
            }
        });
    let code = `
    let posts = ${JSON.stringify(posts)};
    export const Post = {
    |    async get(no) {
    |        let post =  posts.find(post=>post.number == no);
    |        if(post){
    |            return post;
    |        }else{
    |            throw new Error('Post not found');
    |        }
    |    },
    |    async all() {
    |        return posts;
    |    }
    };`.stripMargin();
    await fs.writeFileAsync('./src/model.js', code, { encoding: 'utf-8' });
    require('./build/build.js');
})()
    .catch(e => {
        console.error(e.toString().red);
    });
