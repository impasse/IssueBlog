import { genLinks } from './utils'


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

let links = genLinks(`
261days|https://www.261day.com
蔓舞寻樱的博客|https://emiria.io
Sonico’s Home|http://blog.supvesonico.moe
Ciyuan'ai|https://ciyuanai.net
Hundred Blog|http://txiner.top
uikoo9的个人网站|http://uikoo9.com
Yanhao's Blog|http://www.yanhao.site
ilanyu's Blog|http://blog.lanyus.com
LWL的自由天空|https://blog.lwl12.com
河的第三条岸|http://arondight.me
雨宫千鹤|https://bismarck.moe
夜雨初霁的小窝|https://www.moew.xyz
ouzz的博客|http://ouzz.me
卷猫's blog|http://anneke.cn
東雲研究所|http://blog.zhouys.ac.cn
Just4fun|https://coolrc.me
御坂網路司令塔|https://misaka.genderqueer.gq
`);

let about = `
博主大四(目前正在实习ORZ)，目前主要是Node相关

目前坐标北京，住在某睡城。

专业三分热度，曾很喜欢Ruby、C++、OCaml，酱油Pythonist，偶尔写写前端，客串一下运维OvO。

玻璃心orz

Email: i@shyling.com(欢迎勾搭)
`;

export const pages = {
  '/Links': {
    title: 'Links',
    body: links
  },
  '/About': {
    title: 'About',
    body: about
  },
  404: {
    title: '404 Not Found',
    body: '### Torromow will be a sunny day'
  }
};
