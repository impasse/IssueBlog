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
<li><a href="https://emiria.io" target="__blank">蔓舞寻樱的博客</a></li>
<li><a href="http://blog.supvesonico.moe" target="__blank">Sonico’s Home</a></li>
<li><a href="https://ciyuanai.net" target="__blank">Ciyuan'ai</a></li>
<li><a href="http://txiner.top" target="__blank">Hundred Blog</a></li>
<li><a href="http://uikoo9.com" target="__blank">uikoo9的个人网站</a></li>
<li><a href="http://www.yanhao.site" target="__blank">Yanhao's Blog</a></li>
<li><a href="http://blog.lanyus.com" target="__blank">ilanyu's Blog</a></li>
<li><a href="https://blog.lwl12.com" target="__blank">LWL的自由天空</a></li>
<li><a href="http://arondight.me" target="__blank">河的第三条岸</a></li>
<li><a href="https://bismarck.moe" target="__blank">雨宫千鹤</a></li>
<li><a href="https://www.moew.xyz" target="__blank">夜雨初霁的小窝</a></li>
<li><a href="http://ouzz.me" target="__blank">ouzz的博客</a></li>
<li><a href="http://anneke.cn" target="__blank">卷猫's blog</a></li>
</ul>
`;

let about = `
\`\`\`haskell
Prelude> writeFile "load.hs" "main = putStrLn \"酱油选手一只\""
Prelude> :load load.hs
[1 of 1] Compiling Main             ( load.hs, interpreted )
Ok, modules loaded: Main.
*Main> main
酱油选手一只
\`\`\`
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
