function genLinks(links) {
    let out = '<ul>';
    for (const link of links.split(/\r?\n/)) {
        const [name, url, title] = link.split('|');
        if (name && url) {
            out += `<li><a target=\"_blank\" href=\"${url}\" title=\"${title ? title : name}\">${name}</a>`
        }
    }
    return out + '</ul>';
}

export const link = {
    title: 'Links',
    body: genLinks(`
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
Zhustec's Blog|http://blog.zhustec.me/
石樱灯笼的博客|http://blog.catscarlet.com/
千里冰封|http://ice1000.tech/
Zelda's Blog|http://itsay.tech/
So Faaaar|https://faaaar.com/
`)
};

export const about = {
    title: 'About',
    body: `
博主大四(目前正在实习ORZ)，目前主要是Node相关

坐标北京，住在知春里。

专业三分热度，曾很喜欢Ruby、C++、OCaml，酱油Pythonist，偶尔写写前端，客串一下运维OvO。

玻璃心orz

Email: i@shyling.com(欢迎勾搭)`
};