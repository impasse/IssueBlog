require("babel-register");
require('colors');
require('stripmargin').inject();
let fetch = require('node-fetch');
let fs = require('bluebird').promisifyAll(require('fs'));
let RSS = require('rss');
let consts = require('./src/const');
let shell = require('shelljs');
let { marked } = require('./src/utils');


let feed = new RSS({
    title: consts.site_name,
    description: consts.site_description,
    feed_url: `${consts.site_url}/atom.xml`,
    site_url: consts.site_url,
    image_url: `${consts.site_url}/favicon.ico`,
    webMaster: 'shyling'
});

(async function () {
    let posts = (await (await fetch(`https://api.github.com/repos/${consts.owner}/${consts.repo}/issues?creator=${consts.owner}&state=all`)).json())
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
    posts.forEach(post => {
        feed.item({
            title: post.title,
            description: marked(post.body),
            url: `${consts.site_url}/#/post/${post.number}`,
            guid: post.number.toString(),
        });
    })
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
    shell.rm('-rf', 'dist');
    await fs.writeFileAsync('./src/model.js', code, { encoding: 'utf-8' });
    require('./build/build.js');
    await fs.writeFileAsync('./dist/atom.xml', feed.xml(), { encoding: 'utf-8' });
})()
    .catch(e => {
        console.error(e.toString().red);
    });
