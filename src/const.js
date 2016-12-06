export const owner = 'lingmm';
export const repo = 'IssueBlog';
export const site_name = '泠的博客';
export const site_description = 
`この光が空を越えて羽ばたいてゆく

そんな歌を届けたい

僕が贈るものは全て

形のないものだけと

君の心の片隅で

輝く星になりたい`;

let links = `
<ul>
<li><a href="https://www.261day.com" target="_blank">261days</a></li>
<li><a href="https://emiria.io" target="_blank">蔓舞寻樱的博客</a></li>
<li><a href="http://blog.supvesonico.moe" target="_blank">Sonico’s Home</a></li>
<li><a href="https://ciyuanai.net" target="_blank">Ciyuan'ai</a></li>
<li><a href="http://txiner.top" target="_blank">Hundred Blog</a></li>
<li><a href="http://uikoo9.com" target="_blank">uikoo9的个人网站</a></li>
<li><a href="http://www.yanhao.site" target="_blank">Yanhao's Blog</a></li>
<li><a href="http://blog.lanyus.com" target="_blank">ilanyu's Blog</a></li>
<li><a href="https://blog.lwl12.com" target="_blank">LWL的自由天空</a></li>
<li><a href="http://arondight.me" target="_blank">河的第三条岸</a></li>
<li><a href="https://bismarck.moe" target="_blank">雨宫千鹤</a></li>
<li><a href="https://www.moew.xyz" target="_blank">夜雨初霁的小窝</a></li>
<li><a href="http://ouzz.me" target="_blank">ouzz的博客</a></li>
<li><a href="http://anneke.cn" target="_blank">卷猫's blog</a></li>
</ul>
`;

let about = `
ISTP一只。
`;

export const pages = {
  '/Links': {
    body: links,
    title: 'Links'
  },
  '/About': {
    body: about,
    title: 'About'
  },
  404: {
    title: '404 Not Found',
    body: '### Torromow will be a sunny day'
  }
};
