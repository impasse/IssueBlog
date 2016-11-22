import marked from 'marked'
import dateutil from 'dateutil'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

module.exports = {
  owner: 'lingmm',
  repo: 'IssueBlog',
  site_name: 'Issue Blog',
  site_description: '这里是一个用Issue写的博客',
  marked: v=>marked(v),
  init: v=> {
    v = v || '';
    let i = v.indexOf('<!--more-->');
    return v.substring(0, i >= 0 ? i : undefined);
  },
  format_date(date){
    return dateutil.format(date ? new Date(date) : new Date(), 'Y/m/d');
  },
  pages:{
    '/Links':{
      body:'## Links of my liked',
      title:'Links'
    },
    '/About':{
      body:'### About Me',
      title:'About'
    },
    404:{
      title:'404 Not Found',
      body: '### this resource not be found'
    }
  }
};
